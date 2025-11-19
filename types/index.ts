export interface Coin {
  name: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  value: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  coinName: string;
  coinSymbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  total: number;
  fees?: number;
  status?: string;
}

export interface PortfolioDataPoint {
  timestamp: Date;
  value: number;
}

export interface Portfolio {
  id: number;
  cashBalance: number;
}
