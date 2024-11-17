const axios = require("axios");
const Annonce = require("../models/Annonce");
const { publishToExchange } = require("../messageBroker");

exports.createAnnonce = async (req, res) => {
  try {
    const annonce = new Annonce(req.body);
    await annonce.save();

    publishToExchange({ event: "NEW_ANNONCE", data: annonce });

    const endpoints = [
      "http://localhost:3002/api/consultations/annonces",
      "http://localhost:3004/api/locations/annonces",
    ];

    for (const endpoint of endpoints) {
      try {
        await axios.post(endpoint, annonce);
        console.log(`Message envoyé à ${endpoint}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi au service via REST (${endpoint}):`,
          error.message
        );
      }
    }

    res.status(201).json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
