export function pearsonCorrelation(x, y) {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.reduce((sum, xi, i) => sum + (xi - avgX) * (y[i] - avgY), 0);
  const denomX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - avgX) ** 2, 0));
  const denomY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - avgY) ** 2, 0));

  return numerator / (denomX * denomY);
}

export function calculateCorrelationMatrix(dataByStock) {
  const symbols = Object.keys(dataByStock);
  const matrix = [];

  for (let i = 0; i < symbols.length; i++) {
    const row = [];
    for (let j = 0; j < symbols.length; j++) {
      const x = dataByStock[symbols[i]];
      const y = dataByStock[symbols[j]];
      row.push(pearsonCorrelation(x, y));
    }
    matrix.push(row);
  }

  return matrix;
}
export function pearsonCorrelation(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = y.reduce((a, b) => a + b) / n;

  const numerator = x.reduce((sum, xi, i) => sum + ((xi - meanX) * (y[i] - meanY)), 0);
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + ((xi - meanX) ** 2), 0) *
    y.reduce((sum, yi) => sum + ((yi - meanY) ** 2), 0)
  );

  return denominator === 0 ? 0 : (numerator / denominator);
}

