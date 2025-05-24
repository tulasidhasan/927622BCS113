import { useEffect, useState } from 'react';
import { getMultipleStockData } from '../utils/api';
import { pearsonCorrelation } from '../utils/statistics';
import CorrelationHeatmap from '../components/CorrelationHeatmap';

const tickers = ['AAPL', 'MSFT', 'GOOG', 'NVDA', 'AMZN'];

export default function CorrelationHeatmap({ minutes = 50 }) {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMultipleStockData(tickers, minutes);
      const n = data.length;
      const result = Array(n).fill(0).map(() => Array(n).fill(0));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          result[i][j] = pearsonCorrelation(data[i].prices, data[j].prices).toFixed(2);
        }
      }

      setMatrix(result);
    }

    fetchData();
  }, [minutes]);

  return (
    <div className="overflow-auto mt-8">
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Ticker</th>
            {tickers.map(t => <th key={t} className="border border-gray-400 p-2">{t}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td className="border border-gray-400 p-2 font-bold">{tickers[i]}</td>
              {row.map((val, j) => (
                <td
                  key={j}
                  className="border border-gray-400 p-2"
                  style={{ backgroundColor: getHeatColor(val) }}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getHeatColor(value) {
  const num = parseFloat(value);
  const r = Math.floor((1 - num) * 255);
  const g = Math.floor(num * 255);
  return `rgb(${r},${g},150)`;
}


export default function HeatmapPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Correlation Heatmap</h2>
      <CorrelationHeatmap minutes={50} />
    </div>
  );
}
