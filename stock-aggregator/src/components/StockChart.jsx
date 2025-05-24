import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getStockData } from '../utils/api';

export default function StockChart({ ticker = 'NVDA', minutes = 50 }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const rawData = await getStockData(ticker, minutes);

      // Transform to [{ time, price }] for Recharts
      const formatted = rawData.map((d) => ({
        time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: d.price,
      }));

      setData(formatted);
    }

    fetchData();
  }, [ticker, minutes]);

  const avg = data.reduce((sum, d) => sum + d.price, 0) / (data.length || 1);

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#007bff" />
      <ReferenceLine y={avg} label="Avg" stroke="red" strokeDasharray="3 3" />
    </LineChart>
  );
}
