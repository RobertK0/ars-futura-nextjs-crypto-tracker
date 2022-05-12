import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3/";

const getCoinsData = async function (
  vars = {
    perPage: "10",
    order: "market_cap_desc",
    cur: "usd",
    page: "1",
  }
) {
  const response = await axios.get(
    `${baseURL}coins/markets?vs_currency=${vars.cur}&order=${vars.order}&per_page=${vars.perPage}&page=${vars.page}`
  );
  return response.data;
};

export default getCoinsData;
