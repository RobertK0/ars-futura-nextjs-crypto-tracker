type IndividualCoin = {
  description: { en: string };
  id: string;
  image: { thumb: string; small: string; large: string };
  name: string;
  market_data: {
    ath: number;
    current_price: number;
    symbol: string;

    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    market_cap_rank: number;
    market_cap: number;
    total_volume: { usd: number };
  };
};

export default IndividualCoin;
