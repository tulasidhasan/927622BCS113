import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

export async function getStockData(ticker, minutes = 60) {
  try {
    const response = await axios.get(`${BASE_URL}/${ticker}?minutes=${minutes}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
}

export async function getAllStocks() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all stocks:', error);
    return [];
  }
}
export async function getMultipleStockData(tickers, minutes = 50) {
  const promises = tickers.map((ticker) =>
    getStockData(ticker, minutes).then(data => ({
      ticker,
      prices: data.map(d => d.price)
    }))
  );
  return Promise.all(promises);
}
