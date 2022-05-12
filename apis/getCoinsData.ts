import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3/";

const getCoinsData = async function (
  page = "1",
  perPage = "10",
  order = "market_cap_desc",
  cur = "usd"
) {
  const response = await axios.get(
    `${baseURL}coins/markets?vs_currency=${cur}&order=${order}&per_page=${perPage}&page=${page}`
  );
  return response.data;
};

export default getCoinsData;
