import { calculateCorrelationMatrix } from '../utils/statistics';

export default function CorrelationHeatmap({ stockData }) {
  const matrix = calculateCorrelationMatrix(stockData);

  return (
    <div className="grid grid-cols-6 gap-1">
      {matrix.map((row, i) =>
        row.map((value, j) => (
          <div
            key={`${i}-${j}`}
            className="w-10 h-10 flex items-center justify-center text-xs"
            style={{ backgroundColor: `rgba(0, 0, 255, ${Math.abs(value)})` }}
          >
            {value.toFixed(2)}
          </div>
        ))
      )}
    </div>
  );
}
