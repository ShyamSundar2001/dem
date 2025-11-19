'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Portfolio from '@/components/Portfolio';
import Transactions from '@/components/Transactions';
import PerformanceChart from '@/components/PerformanceChart';
import { performanceData } from '@/lib/data';
import { Coin, Transaction, PortfolioDataPoint, Portfolio as PortfolioType } from '@/types';
import { getPortfolio, getHoldingsAggregated, getTransactions } from '@/lib/api';
import { transformHoldingsToCoins, transformApiTransactions } from '@/lib/dataTransformers';

export default function Home() {
  const [portfolio, setPortfolio] = useState<Coin[]>([]);
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [performance, setPerformance] = useState<PortfolioDataPoint[]>(performanceData);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [portfolioResponse, holdingsResponse, transactionsResponse] = await Promise.all([
        getPortfolio(),
        getHoldingsAggregated(),
        getTransactions(),
      ]);

      // Update cash balance
      if (portfolioResponse && portfolioResponse.length > 0) {
        setCashBalance(portfolioResponse[0].cash_balance);
      }

      // Transform and update holdings
      const coins = await transformHoldingsToCoins(holdingsResponse);
      setPortfolio(coins);

      // Transform and update transactions
      const transformedTxns = transformApiTransactions(transactionsResponse);
      setTxns(transformedTxns);

      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch and periodic updates
  useEffect(() => {
    setIsMounted(true);
    fetchData();

    // Refresh data every 10 minutes
    const interval = setInterval(() => {
      fetchData();

      // Update performance chart with dummy data
      setPerformance(prev => {
        const lastValue = prev[prev.length - 1]?.value || 100;
        const newValue = lastValue + (Math.random() - 0.48) * 2;
        return [...prev, {
          timestamp: new Date(),
          value: Math.max(80, Math.min(140, newValue))
        }];
      });
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Crypto Portfolio Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {isMounted ? format(lastUpdate, 'MMM dd, yyyy HH:mm:ss') : '—'}
          </p>
          {cashBalance > 0 && (
            <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
              Cash Balance: ${cashBalance.toFixed(2)}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-300 font-medium">Error loading data:</p>
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
          </div>
        )}

        {loading && !isMounted ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading portfolio data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {isMounted && (
              <>
                {/* Portfolio Overview */}
                <Portfolio coins={portfolio} cashBalance={cashBalance} />

                {/* Performance Chart */}
                <PerformanceChart data={performance} />

                {/* Transactions Table */}
                <Transactions transactions={txns} />
              </>
            )}
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Portfolio Tracker • Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}
