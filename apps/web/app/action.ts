"use server"; // 🌟 Force server execution execution context to bypass browser CORS

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  fully_diluted_valuation: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface GlobalMarketData {
  marketCapChange24h: number;
  totalMarketCapUSD: number;
}

export interface AssetRecord {
  id: string;
  name: string;
  market_cap_rank: number;
}

export const fetchTickerData = async (limit = 4, currency = "usd") => {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  // Use the same requestOptions pattern...
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}`,
    { headers: { "x-cg-demo-api-key": apiKey! } }
  );

  if (!response.ok) throw new Error("Ticker sync failed");
  return response.json();
};

export const fetchDashboardData = async (
  page = 1,
  perPage = 3,
  currency = "usd"
) => {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

  if (!apiKey) {
    throw new Error("Missing CoinGecko API Configuration Token");
  }

  // Common request initialization configuration headers block
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-cg-demo-api-key": apiKey, // 🌟 Authenticating via demo standard header layout
    },
  };

  try {
    const [marketsRes, globalRes] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`,
        requestOptions
      ),
      fetch("https://api.coingecko.com/api/v3/global", requestOptions),
    ]);

    // Handle rate-limiting (429) or invalid token layouts natively
    if (marketsRes.status === 429 || globalRes.status === 429) {
      throw new Error(
        "Rate limit hit. CoinGecko Demo Key allows up to 100 requests/min."
      );
    }

    if (!marketsRes.ok || !globalRes.ok) {
      throw new Error(
        `Market sync failed. Status codes: ${marketsRes.status} / ${globalRes.status}`
      );
    }

    const marketsData: CoinData[] = await marketsRes.json();
    const globalJson = await globalRes.json();

    const globalData: GlobalMarketData = {
      marketCapChange24h: globalJson.data.market_cap_change_percentage_24h_usd,
      totalMarketCapUSD: globalJson.data.total_market_cap.usd,
    };

    return {
      coins: marketsData,
      global: globalData,
    };
  } catch (error) {
    console.error("Data Sync Failure Logs:", error);
    throw error;
  }
};

export const fetchGlobalStats = async (
  page = 1,
  perPage = 6,
  currency = "usd"
) => {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-cg-demo-api-key": apiKey!, // 🌟 Authenticating via demo standard header layout
    },
  };

  try {
    const stats = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
      requestOptions
    );

    // Handle rate-limiting (429) or invalid token layouts natively
    if (stats.status === 429) {
      throw new Error(
        "Rate limit hit. CoinGecko Demo Key allows up to 100 requests/min."
      );
    }

    if (!stats.ok) {
      throw new Error(`Market sync failed. Status codes: ${stats.status}`);
    }

    const marketsData: CoinData[] = await stats.json();

    return {
      coins: marketsData,
    };
  } catch (error) {
    console.error("Data Sync Failure Logs:", error);
    throw error;
  }
};

export const fetchAssetRegistry = async () => {
  // We fetch a larger batch once to populate the search index
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
  );
  const data = await res.json();

  return data.map((coin: AssetRecord) => ({
    id: coin.id,
    name: coin.name,
    rank: coin.market_cap_rank,
  }));
};
