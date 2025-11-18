# Crypto Portfolio Tracker

A modern, responsive cryptocurrency portfolio tracker built with Next.js, TypeScript, and Tailwind CSS. Track your crypto holdings, view transaction history, and monitor portfolio performance over time.

## Features

- **Portfolio Overview**: View all your cryptocurrency holdings with real-time values
  - Coin names and symbols
  - Quantity held
  - Current price
  - Total value (price × quantity)

- **Transaction History**: Display last 100 transactions
  - Timestamp of each trade
  - Coin name and symbol
  - Quantity traded
  - Price at which trade was placed
  - Buy/Sell indicator
  - Total transaction value

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
│   └── page.tsx              # Main page
├── components/
│   ├── Portfolio.tsx         # Portfolio display component
│   ├── Transactions.tsx      # Transaction history table
│   └── PerformanceChart.tsx  # Performance chart
├── lib/
│   └── data.ts               # Sample data and data generation
├── types/
│   └── index.ts              # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vercel.json               # Vercel configuration
```

## Customization

### Adding Real API Integration

The current implementation uses sample data. To integrate with a real cryptocurrency API:

1. Create an API route in `app/api/`
2. Update the data fetching logic in `app/page.tsx`
3. Add environment variables for API keys
4. Set up periodic data refresh using Next.js API routes or server actions

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