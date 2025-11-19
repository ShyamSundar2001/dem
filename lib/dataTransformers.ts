/**
 * Data transformation utilities for converting API responses to UI models
 */

import { Coin, Transaction } from '@/types';
import { HoldingResponse, TransactionResponse, getCurrentPrice } from './api';

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

  return coinNames[symbol] || symbol;
}

/**
 * Transform HoldingResponse to Coin interface
 */
export async function transformHoldingToCoin(holding: HoldingResponse): Promise<Coin> {
  const currentPrice = await getCurrentPrice(holding.coin);
  const value = holding.total_quantity * currentPrice;

  return {
    name: getCoinName(holding.coin),
    symbol: holding.coin,
    quantity: holding.total_quantity,
    currentPrice,
    value,
  };
}

/**
 * Transform multiple holdings to coins
 */
export async function transformHoldingsToCoins(holdings: HoldingResponse[]): Promise<Coin[]> {
  const coinPromises = holdings.map(holding => transformHoldingToCoin(holding));
  return Promise.all(coinPromises);
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
  return apiTxns.map(transformApiTransaction);
}
