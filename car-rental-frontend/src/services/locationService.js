import axios from "axios";

const API_URL = "http://localhost:3004/api/locations";

export const louerAnnonce = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/louer`);
  return response.data;
};
