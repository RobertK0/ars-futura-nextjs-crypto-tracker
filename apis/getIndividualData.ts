import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3/";

const getIndividualData = async function (id: string) {
  const response = await axios.get(
    `${baseURL}coins/${id}?community_data=false&developer_data=false&sparkline=true`
  );
  return response.data;
};

export default getIndividualData;
