type IndividualCoin = {
  description: { en: string };
  id: string;
  image: { thumb: string; small: string; large: string };
  name: string;
  symbol: string;
  market_data: {
    ath: number;
    current_price: { btc: number; usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    market_cap_rank: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
  };
  ticker: { base: string; target: string; last: number }[];
};

export default IndividualCoin;
