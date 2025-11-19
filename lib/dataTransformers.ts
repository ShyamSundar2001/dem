/**
 * Data transformation utilities for converting API responses to UI models
 */

import { Coin, Transaction } from '@/types';
import { HoldingResponse, TransactionResponse, getCurrentPrice } from './api';
import { logger } from './logger';

/**
 * Get full coin name from symbol
 */
function getCoinName(symbol: string): string {
  const coinNames: Record<string, string> = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    ADA: 'Cardano',
    SOL: 'Solana',
    DOT: 'Polkadot',
    MATIC: 'Polygon',
    LINK: 'Chainlink',
    AVAX: 'Avalanche',
    UNI: 'Uniswap',
    ATOM: 'Cosmos',
  };

  const name = coinNames[symbol] || symbol;
  if (!coinNames[symbol]) {
    logger.warn('Coin name mapping not found', { symbol, fallbackName: name });
  }
  return name;
}

/**
 * Transform HoldingResponse to Coin interface
 */
export async function transformHoldingToCoin(holding: HoldingResponse): Promise<Coin> {
  logger.debug('Transforming holding to coin', { symbol: holding.coin, quantity: holding.total_quantity });

  const currentPrice = await getCurrentPrice(holding.coin);
  const value = holding.total_quantity * currentPrice;

  const coin = {
    name: getCoinName(holding.coin),
    symbol: holding.coin,
    quantity: holding.total_quantity,
    currentPrice,
    value,
  };

  logger.debug('Holding transformed', {
    symbol: coin.symbol,
    name: coin.name,
    quantity: coin.quantity,
    price: coin.currentPrice,
    value: coin.value,
  });

  return coin;
}

/**
 * Transform multiple holdings to coins
 */
export async function transformHoldingsToCoins(holdings: HoldingResponse[]): Promise<Coin[]> {
  logger.info('Starting holdings transformation', { holdingCount: holdings.length });
  const startTime = performance.now();

  const coinPromises = holdings.map(holding => transformHoldingToCoin(holding));
  const coins = await Promise.all(coinPromises);

  const duration = performance.now() - startTime;
  logger.info('Holdings transformation completed', {
    inputCount: holdings.length,
    outputCount: coins.length,
    durationMs: duration.toFixed(2),
  });

  return coins;
}

/**
 * Transform TransactionResponse to Transaction interface
 */
export function transformApiTransaction(apiTxn: TransactionResponse): Transaction {
  return {
    id: apiTxn.id,
    timestamp: new Date(apiTxn.date),
    coinName: getCoinName(apiTxn.coin),
    coinSymbol: apiTxn.coin,
    quantity: apiTxn.quantity,
    price: apiTxn.price,
    type: apiTxn.type,
    total: apiTxn.total_amount,
    fees: apiTxn.fees,
    status: apiTxn.status,
  };
}

/**
 * Transform multiple transactions
 */
export function transformApiTransactions(apiTxns: TransactionResponse[]): Transaction[] {
  logger.info('Starting transactions transformation', { transactionCount: apiTxns.length });
  const startTime = performance.now();

  const transactions = apiTxns.map(transformApiTransaction);

  const duration = performance.now() - startTime;
  logger.info('Transactions transformation completed', {
    inputCount: apiTxns.length,
    outputCount: transactions.length,
    durationMs: duration.toFixed(2),
  });

  return transactions;
}
