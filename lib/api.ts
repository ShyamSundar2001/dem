/**
 * API service for fetching portfolio data from Sentient API
 */

import { logger } from './logger';

const API_BASE_URL = 'https://sent-api.dev.sentient.xyz/rpc';
const API_HEADERS = {
  'x-custom-auth': 'd9ab6590f8a7b4e6d0c67db00b5f7e5cbfd3179fbbfdd3432a44d604fa10b7a3',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHNlbnRpZW50LmludGVybmFsIiwidXNlciI6InRlc3RAc2VudGllbnQuaW50ZXJuYWwiLCJyb2xlIjoic2VudGFwcCIsImV4cCI6MTc2MzYzNTg2OH0.OxZ6A97W3aksuyn7PDUXnoj5bVYzzcwKFQs4vMn_oyc',
};

// API Response Interfaces
export interface PortfolioResponse {
  id: number;
  cash_balance: number;
}

export interface HoldingResponse {
  coin: string;
  total_quantity: number;
  avg_purchase_cost: number;
  total_invested: number;
  purchase_count: number;
  first_purchase_date: string;
  last_purchase_date: string;
}

export interface TransactionResponse {
  id: string;
  coin: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
  total_amount: number;
  fees: number;
  status: string;
}

/**
 * Fetch portfolio data (cash balance)
 */
export async function getPortfolio(): Promise<PortfolioResponse[]> {
  const endpoint = `${API_BASE_URL}/get_portfolio`;
  logger.info('API Request: getPortfolio', { endpoint });

  const startTime = performance.now();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    const duration = performance.now() - startTime;

    if (!response.ok) {
      logger.error('API Request Failed: getPortfolio', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        durationMs: duration.toFixed(2),
      });
      throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
    }

    const data = await response.json();
    logger.info('API Response: getPortfolio', {
      endpoint,
      status: response.status,
      durationMs: duration.toFixed(2),
      recordCount: data.length,
    });
    logger.debug('Portfolio data received', { data });

    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger.error('API Error: getPortfolio', {
      endpoint,
      durationMs: duration.toFixed(2),
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Fetch aggregated holdings
 */
export async function getHoldingsAggregated(): Promise<HoldingResponse[]> {
  const endpoint = `${API_BASE_URL}/get_holdings_aggregated`;
  logger.info('API Request: getHoldingsAggregated', { endpoint });

  const startTime = performance.now();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    const duration = performance.now() - startTime;

    if (!response.ok) {
      logger.error('API Request Failed: getHoldingsAggregated', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        durationMs: duration.toFixed(2),
      });
      throw new Error(`Failed to fetch holdings: ${response.statusText}`);
    }

    const data = await response.json();
    logger.info('API Response: getHoldingsAggregated', {
      endpoint,
      status: response.status,
      durationMs: duration.toFixed(2),
      recordCount: data.length,
    });
    logger.debug('Holdings data received', { data });

    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger.error('API Error: getHoldingsAggregated', {
      endpoint,
      durationMs: duration.toFixed(2),
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Fetch transactions
 */
export async function getTransactions(): Promise<TransactionResponse[]> {
  const endpoint = `${API_BASE_URL}/get_transactions`;
  logger.info('API Request: getTransactions', { endpoint });

  const startTime = performance.now();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    const duration = performance.now() - startTime;

    if (!response.ok) {
      logger.error('API Request Failed: getTransactions', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        durationMs: duration.toFixed(2),
      });
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const data = await response.json();
    logger.info('API Response: getTransactions', {
      endpoint,
      status: response.status,
      durationMs: duration.toFixed(2),
      recordCount: data.length,
    });
    logger.debug('Transactions data received', { data });

    return data;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger.error('API Error: getTransactions', {
      endpoint,
      durationMs: duration.toFixed(2),
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Fetch current market price for a coin (mock data for now)
 * In production, this should fetch from a real price API
 */
export async function getCurrentPrice(coinSymbol: string): Promise<number> {
  logger.debug('Fetching price', { coinSymbol });

  // Mock prices - replace with real price API later
  const mockPrices: Record<string, number> = {
    BTC: 43250,
    ETH: 2280.5,
    ADA: 0.58,
    SOL: 98.75,
    DOT: 7.42,
    MATIC: 0.9,
    LINK: 15.5,
    AVAX: 35.2,
    UNI: 8.5,
    ATOM: 10.2,
  };

  const price = mockPrices[coinSymbol] || 0;

  if (price === 0) {
    logger.warn('Price not found for coin', { coinSymbol });
  } else {
    logger.debug('Price retrieved', { coinSymbol, price });
  }

  return price;
}
