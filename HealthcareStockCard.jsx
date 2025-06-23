import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

// ✅ Replace YOUR_API_KEY with your RapidAPI key
const headers = {
  'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  'x-rapidapi-key': 'YOUR_API_KEY'
};

const HealthcareStockCard = ({ symbol }) => {
  const [quote, setQuote] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}&region=US`,
      { headers }
    ).then(res => res.json());

    const fetchTimeseries = fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-timeseries?symbol=${symbol}&region=US`,
      { headers }
    ).then(res => res.json());

    Promise.all([fetchQuote, fetchTimeseries])
      .then(([quoteData, tsData]) => {
        setQuote(quoteData);

        if (tsData?.timeseries?.timestamp && tsData?.timeseries?.close) {
          const series = tsData.timeseries.timestamp.map((ts, idx) => ({
            date: new Date(ts * 1000).toLocaleDateString(),
            close: tsData.timeseries.close[idx]
          }));
          setChartData(series.reverse());
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [symbol]);

  if (loading) return <div>Loading {symbol}...</div>;
  if (!quote) return <div>Error loading data.</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h2>{symbol}</h2>
      <p><strong>Price:</strong> ${quote.price?.regularMarketPrice?.raw ?? "N/A"}</p>
      <p><strong>Market Cap:</strong> {quote.price?.marketCap?.fmt ?? "N/A"}</p>
      <p><strong>P/E Ratio:</strong> {quote.summaryDetail?.trailingPE?.raw ?? "N/A"}</p>
      <p><strong>Dividend Yield:</strong> {quote.summaryDetail?.dividendYield?.raw ?? "N/A"}</p>
      <p><strong>Change:</strong> {quote.price?.regularMarketChangePercent?.fmt ?? "N/A"}</p>

      <h4>Price History</h4>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis dataKey="close" />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No chart data available.</p>
      )}
    </div>
  );
};

export default HealthcareStockCard;
