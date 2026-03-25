export const marketOverview = [
  {
    label: 'Brent Crude',
    symbol: 'BRN',
    price: '$84.72',
    change: '+1.26%',
    positive: true,
    volume: '2.8M',
    rangeLabel: 'Day Range',
    range: '$83.14 - $85.03',
    points: [62, 60, 64, 66, 65, 69, 71, 73, 75, 78, 81, 84],
  },
  {
    label: 'Bitcoin',
    symbol: 'BTC',
    price: '$67,480',
    change: '+3.84%',
    positive: true,
    volume: '$31.2B',
    rangeLabel: '24H Range',
    range: '$64.1K - $67.9K',
    points: [38, 40, 41, 43, 47, 49, 53, 56, 58, 61, 64, 68],
  },
  {
    label: 'S&P 500',
    symbol: 'SPX',
    price: '5,214.18',
    change: '-0.42%',
    positive: false,
    volume: '$4.9T',
    rangeLabel: 'Session',
    range: '5,188 - 5,236',
    points: [74, 72, 70, 73, 71, 68, 66, 67, 65, 63, 61, 59],
  },
  {
    label: 'EUR/USD',
    symbol: 'EURUSD',
    price: '1.0948',
    change: '+0.21%',
    positive: true,
    volume: '$112B',
    rangeLabel: 'FX Range',
    range: '1.0902 - 1.0961',
    points: [44, 45, 46, 46, 47, 48, 49, 50, 50, 51, 52, 53],
  },
]

export const marketBenchmarks = [
  {
    title: 'Energy Futures',
    subtitle: 'Oil complex extends gains as shipping disruptions tighten supply sentiment.',
    accent: '#f59e0b',
    labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'],
    points: [42, 45, 44, 48, 53, 58, 56, 61, 65, 69, 73, 76],
    stats: [
      { label: 'WTI', value: '$80.15', change: '+0.98%' },
      { label: 'Brent', value: '$84.72', change: '+1.26%' },
      { label: 'Nat Gas', value: '$2.14', change: '-0.31%' },
    ],
  },
  {
    title: 'Digital Assets',
    subtitle: 'Crypto leadership broadens as majors and layer-1 tokens move higher together.',
    accent: '#22c55e',
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    points: [34, 36, 39, 41, 46, 51, 54, 57, 60, 64, 66, 71],
    stats: [
      { label: 'BTC', value: '$67,480', change: '+3.84%' },
      { label: 'ETH', value: '$3,480', change: '+2.71%' },
      { label: 'SOL', value: '$182.33', change: '+4.19%' },
    ],
  },
]

export const marketBoards = [
  {
    title: 'Oil & Energy',
    items: [
      { name: 'Brent Crude', symbol: 'BRN', price: '$84.72', change: '+1.26%', positive: true },
      { name: 'WTI Crude', symbol: 'WTI', price: '$80.15', change: '+0.98%', positive: true },
      { name: 'Natural Gas', symbol: 'NG', price: '$2.14', change: '-0.31%', positive: false },
      { name: 'Heating Oil', symbol: 'HO', price: '$2.67', change: '+0.54%', positive: true },
    ],
  },
  {
    title: 'Crypto',
    items: [
      { name: 'Bitcoin', symbol: 'BTC', price: '$67,480', change: '+3.84%', positive: true },
      { name: 'Ethereum', symbol: 'ETH', price: '$3,480', change: '+2.71%', positive: true },
      { name: 'Solana', symbol: 'SOL', price: '$182.33', change: '+4.19%', positive: true },
      { name: 'XRP', symbol: 'XRP', price: '$0.64', change: '-0.22%', positive: false },
    ],
  },
  {
    title: 'Global Equities',
    items: [
      { name: 'S&P 500', symbol: 'SPX', price: '5,214.18', change: '-0.42%', positive: false },
      { name: 'Nasdaq 100', symbol: 'NDX', price: '18,104.27', change: '+0.18%', positive: true },
      { name: 'Dow Jones', symbol: 'DJI', price: '39,224.41', change: '-0.16%', positive: false },
      { name: 'Nikkei 225', symbol: 'NKY', price: '40,102.91', change: '+0.73%', positive: true },
    ],
  },
  {
    title: 'FX Crosses',
    items: [
      { name: 'EUR / USD', symbol: 'EURUSD', price: '1.0948', change: '+0.21%', positive: true },
      { name: 'GBP / USD', symbol: 'GBPUSD', price: '1.2811', change: '+0.11%', positive: true },
      { name: 'USD / JPY', symbol: 'USDJPY', price: '150.42', change: '-0.34%', positive: false },
      { name: 'USD / PKR', symbol: 'USDPKR', price: '278.55', change: '+0.08%', positive: true },
    ],
  },
]

export const marketMovers = [
  { name: 'Coinbase', ticker: 'COIN', price: '$271.40', change: '+5.72%', positive: true, sector: 'Crypto Equities' },
  { name: 'Exxon Mobil', ticker: 'XOM', price: '$118.82', change: '+1.64%', positive: true, sector: 'Energy' },
  { name: 'NVIDIA', ticker: 'NVDA', price: '$903.55', change: '-1.12%', positive: false, sector: 'Semiconductors' },
  { name: 'Tesla', ticker: 'TSLA', price: '$171.28', change: '-2.08%', positive: false, sector: 'Autos' },
  { name: 'Palantir', ticker: 'PLTR', price: '$26.41', change: '+3.03%', positive: true, sector: 'Software' },
]

export const marketCalendar = [
  { time: '08:30', event: 'US Durable Goods Orders', impact: 'High' },
  { time: '10:00', event: 'Eurozone Consumer Confidence', impact: 'Medium' },
  { time: '14:00', event: 'OPEC+ Production Briefing', impact: 'High' },
  { time: '16:30', event: 'API Weekly Crude Stocks', impact: 'Medium' },
]

export const homeMarketHighlights = [
  {
    title: 'Oil Market',
    symbol: 'BRN',
    price: '$84.72',
    change: '+1.26%',
    positive: true,
    description: 'Crude futures stay firm as supply risks remain in focus.',
    href: '/markets#oil-energy',
  },
  {
    title: 'Crypto',
    symbol: 'BTC',
    price: '$67,480',
    change: '+3.84%',
    positive: true,
    description: 'Bitcoin and majors extend gains in a broad digital asset rally.',
    href: '/markets#crypto',
  },
  {
    title: 'Stocks',
    symbol: 'SPX',
    price: '5,214.18',
    change: '-0.42%',
    positive: false,
    description: 'US equities pause after a strong run as traders rotate sectors.',
    href: '/markets#global-equities',
  },
  {
    title: 'Currencies',
    symbol: 'EURUSD',
    price: '1.0948',
    change: '+0.21%',
    positive: true,
    description: 'FX desks track dollar softness against major pairs.',
    href: '/markets#fx-crosses',
  },
]
