import { useState } from 'react';
import StockChart from '../components/StockChart';
import TimeframeSelector from '../components/TimeframeSelector';

export default function StockPage() {
  const [minutes, setMinutes] = useState(50);
  const [ticker, setTicker] = useState('NVDA');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Price Chart</h1>
      <TimeframeSelector onChange={(val) => setMinutes(Number(val))} />
      <StockChart ticker={ticker} minutes={minutes} />
    </div>
  );
}
