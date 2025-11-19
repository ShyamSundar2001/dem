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
}

export interface PortfolioDataPoint {
  timestamp: Date;
  value: number;
}
