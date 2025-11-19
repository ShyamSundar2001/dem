'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Portfolio from '@/components/Portfolio';
import Transactions from '@/components/Transactions';
import PerformanceChart from '@/components/PerformanceChart';
import { portfolioData, transactions, performanceData } from '@/lib/data';
import { Coin, Transaction, PortfolioDataPoint } from '@/types';

export default function Home() {
  const [portfolio, setPortfolio] = useState<Coin[]>(portfolioData);
  const [txns, setTxns] = useState<Transaction[]>(transactions);
  const [performance, setPerformance] = useState<PortfolioDataPoint[]>(performanceData);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  // Simulate real-time updates every 10 minutes
  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      // In a real application, you would fetch data from an API here
      // For now, we'll just update the timestamp and slightly modify prices
      setPortfolio(prev => prev.map(coin => ({
        ...coin,
        currentPrice: coin.currentPrice * (1 + (Math.random() - 0.5) * 0.02),
        value: coin.quantity * coin.currentPrice * (1 + (Math.random() - 0.5) * 0.02)
      })));

      // Add new data point to performance chart
      setPerformance(prev => {
        const lastValue = prev[prev.length - 1]?.value || 100;
        const newValue = lastValue + (Math.random() - 0.48) * 2;
        return [...prev, {
          timestamp: new Date(),
          value: Math.max(80, Math.min(140, newValue))
        }];
      });

      setLastUpdate(new Date());
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
        </div>

        <div className="space-y-8">
          {isMounted && (
            <>
              {/* Portfolio Overview */}
              <Portfolio coins={portfolio} />

              {/* Performance Chart */}
              <PerformanceChart data={performance} />

              {/* Transactions Table */}
              <Transactions transactions={txns} />
            </>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Portfolio Tracker • Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}
