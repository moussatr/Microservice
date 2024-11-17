import axios from "axios";

const CONSULTATION_API_URL = "http://localhost:3002/api/consultations";
const ANNONCE_API_URL = "http://localhost:3001/api/annonces";
const LOCATION_API_URL = "http://localhost:3004/api/locations";

export const getAnnonceById = async (id) => {
  try {
    const response = await axios.get(`${CONSULTATION_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error);
    throw error;
  }
};

export const createAnnonce = async (annonce) => {
  try {
    const response = await axios.post(ANNONCE_API_URL, annonce);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    throw error;
  }
};

export const louerAnnonce = async (id) => {
  const response = await axios.put(`${LOCATION_API_URL}/${id}/louer`);
  return response.data;
};
