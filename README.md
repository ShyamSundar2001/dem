# Crypto Portfolio Tracker

A modern, responsive cryptocurrency portfolio tracker built with Next.js, TypeScript, and Tailwind CSS. Track your crypto holdings, view transaction history, and monitor portfolio performance over time.

## Features

- **Portfolio Overview**: View all your cryptocurrency holdings with real-time values
  - Cash balance display
  - Total portfolio value (holdings + cash)
  - Coin names and symbols
  - Quantity held
  - Current price
  - Total value (price × quantity)

- **Transaction History**: Complete transaction history from API
  - Transaction ID
  - Timestamp of each trade
  - Coin name and symbol
  - Quantity traded
  - Price at which trade was placed
  - Buy/Sell indicator
  - Total transaction value
  - Transaction fees
  - Transaction status

- **Performance Chart**: Portfolio performance visualization
  - Indexed to 100 baseline
  - Historical data with timeline view
  - Updates every 10 minutes
  - Shows change over time

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dem
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

## Project Structure

```
dem/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page with API integration
├── components/
│   ├── Portfolio.tsx         # Portfolio display component with cash balance
│   ├── Transactions.tsx      # Transaction history table with fees & status
│   └── PerformanceChart.tsx  # Performance chart
├── lib/
│   ├── api.ts                # API service for Sentient API integration
│   ├── data.ts               # Sample data (used for charts only)
│   └── dataTransformers.ts   # Transform API responses to UI models
├── types/
│   └── index.ts              # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vercel.json               # Vercel configuration
```

## API Integration

The application is integrated with the Sentient API for real-time portfolio data:

### API Endpoints

1. **Portfolio Balance** (`/rpc/get_portfolio`)
   - Fetches current cash balance
   - Returns: `{ id, cash_balance }`

2. **Holdings** (`/rpc/get_holdings_aggregated`)
   - Fetches aggregated cryptocurrency holdings
   - Returns: `{ coin, total_quantity, avg_purchase_cost, total_invested, ... }`

3. **Transactions** (`/rpc/get_transactions`)
   - Fetches complete transaction history
   - Returns: `{ id, coin, type, quantity, price, date, total_amount, fees, status }`

### API Configuration

API credentials and base URL are configured in `/lib/api.ts`. The application:
- Fetches data from all three endpoints in parallel for optimal performance
- Transforms API responses to match UI component interfaces
- Updates data automatically every 10 minutes
- Includes error handling and loading states

### Chart Data

Currently, the performance chart uses dummy/mock data for demonstration. To integrate real chart data:
- Update the `fetchData` function in `app/page.tsx`
- Replace `performanceData` from `/lib/data.ts` with API data
- Calculate portfolio value over time based on historical holdings and prices

## Customization

### Modifying Update Interval

The chart updates every 10 minutes by default. To change this, modify the interval in `app/page.tsx`:

```typescript
// Change 10 * 60 * 1000 to your desired interval in milliseconds
setInterval(() => {
  // Update logic
}, 10 * 60 * 1000);
```

## License

MIT