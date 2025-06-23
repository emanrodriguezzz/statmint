// ✅ stocks.js — StatMint live stock tracker using Yahoo Finance API via RapidAPI

const tickers = [
  "PFE", "JNJ", "MRNA", "UNH", "LLY", "ABBV", "CVS", "ANTM", "BIIB", "BMY",
  "GILD", "VRTX", "REGN", "ISRG", "ZBH", "MDT", "SYK", "BSX", "NVS", "ROG.SW",
  "SNY", "GSK", "AZN", "TAK", "BAYN.DE"
  // 👉 Add more up to 100 tickers here
];

const container = document.getElementById("stocks-container");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3a1d738f20msh37d570357c5e28fp1bb20djsnfa30b534dd5f",
    "X-RapidAPI-Host": "yahoo-finance-real-time1.p.rapidapi.com"
  }
};

tickers.forEach(ticker => {
  fetch(`https://yahoo-finance-real-time1.p.rapidapi.com/stock/get-detail?symbol=${ticker}`, options)
    .then(response => response.json())
    .then(data => {
      // Safely extract data
      const price = data.price?.regularMarketPrice ?? "N/A";
      const change = data.price?.regularMarketChangePercent ?? "N/A";
      const marketCap = data.summaryDetail?.marketCap ?? "N/A";
      const peRatio = data.summaryDetail?.trailingPE ?? "N/A";
      const dividend = data.summaryDetail?.dividendYield ?? "N/A";

      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4 mb-4";
      card.innerHTML = `
        <div class="stock-card h-100">
          <h5>${ticker}</h5>
          <p><strong>Price:</strong> $${price}</p>
          <p><strong>Market Cap:</strong> ${marketCap}</p>
          <p><strong>P/E Ratio:</strong> ${peRatio}</p>
          <p><strong>Dividend Yield:</strong> ${dividend}</p>
          <p><strong>Change:</strong> ${change}%</p>
        </div>
      `;
      container.appendChild(card);
    })
    .catch(err => {
      console.error(`Error loading ${ticker}:`, err);
    });
});
