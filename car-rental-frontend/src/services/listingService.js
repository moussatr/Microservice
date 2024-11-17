import axios from "axios";

const API_URL = "http://localhost:3003/api/listings";

export const getAnnonces = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
