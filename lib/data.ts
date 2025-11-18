import { Coin, Transaction, PortfolioDataPoint } from '@/types';

// Sample portfolio data
export const portfolioData: Coin[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    quantity: 2.5,
    currentPrice: 43250.00,
    value: 108125.00
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    quantity: 15.0,
    currentPrice: 2280.50,
    value: 34207.50
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    quantity: 5000.0,
    currentPrice: 0.58,
    value: 2900.00
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    quantity: 50.0,
    currentPrice: 98.75,
    value: 4937.50
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    quantity: 300.0,
    currentPrice: 7.42,
    value: 2226.00
  }
];

// Generate 100 sample transactions
export const generateTransactions = (): Transaction[] => {
  const coins = [
    { name: 'Bitcoin', symbol: 'BTC', basePrice: 43000 },
    { name: 'Ethereum', symbol: 'ETH', basePrice: 2250 },
    { name: 'Cardano', symbol: 'ADA', basePrice: 0.55 },
    { name: 'Solana', symbol: 'SOL', basePrice: 95 },
    { name: 'Polkadot', symbol: 'DOT', basePrice: 7.2 }
  ];

  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const coin = coins[Math.floor(Math.random() * coins.length)];
    const type: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';
    const priceVariation = 1 + (Math.random() - 0.5) * 0.2; // +/- 10% variation
    const price = coin.basePrice * priceVariation;
    const quantity = Math.random() * 10 + 0.1;

    // Distribute transactions over the last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);

    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    transactions.push({
      id: `txn-${i + 1}`,
      timestamp,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      quantity: parseFloat(quantity.toFixed(4)),
      price: parseFloat(price.toFixed(2)),
      type,
      total: parseFloat((quantity * price).toFixed(2))
    });
  }

  // Sort by timestamp, most recent first
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate portfolio performance data (indexed to 100)
export const generatePerformanceData = (): PortfolioDataPoint[] => {
  const dataPoints: PortfolioDataPoint[] = [];
  const now = new Date();
  const daysToGenerate = 30; // 30 days of data
  const intervalsPerDay = 144; // Every 10 minutes = 6 per hour * 24 hours = 144 intervals

  let currentValue = 100; // Start at index 100

  for (let day = daysToGenerate; day >= 0; day--) {
    for (let interval = intervalsPerDay - 1; interval >= 0; interval--) {
      const timestamp = new Date(now);
      timestamp.setDate(timestamp.getDate() - day);
      timestamp.setHours(0, 0, 0, 0);
      timestamp.setMinutes(interval * 10);

      // Random walk with slight upward bias
      const change = (Math.random() - 0.48) * 2; // Slight upward bias
      currentValue += change;

      // Keep value in reasonable range
      currentValue = Math.max(80, Math.min(140, currentValue));

      dataPoints.push({
        timestamp,
        value: parseFloat(currentValue.toFixed(2))
      });
    }
  }

  return dataPoints.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const transactions = generateTransactions();
export const performanceData = generatePerformanceData();
