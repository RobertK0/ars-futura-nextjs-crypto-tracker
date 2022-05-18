import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = "https://api.coingecko.com/api/v3/";

const getIndividualData = async function (id: string) {
  try {
    const response = await axios.get(
      `${baseURL}coins/${id}?community_data=false&developer_data=false&sparkline=true`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error.message;
  }
};

export default getIndividualData;
