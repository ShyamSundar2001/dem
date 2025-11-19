/**
 * API service for fetching portfolio data from Sentient API
 */

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
  try {
    const response = await fetch(`${API_BASE_URL}/get_portfolio`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}

/**
 * Fetch aggregated holdings
 */
export async function getHoldingsAggregated(): Promise<HoldingResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_holdings_aggregated`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch holdings: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching holdings:', error);
    throw error;
  }
}

/**
 * Fetch transactions
 */
export async function getTransactions(): Promise<TransactionResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_transactions`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

/**
 * Fetch current market price for a coin (mock data for now)
 * In production, this should fetch from a real price API
 */
export async function getCurrentPrice(coinSymbol: string): Promise<number> {
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

  return mockPrices[coinSymbol] || 0;
}
