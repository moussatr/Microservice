const axios = require("axios");
const Annonce = require("../models/Annonce");
const { publishToExchange } = require("../messageBroker");

async function louerAnnonce(req, res) {
  try {
    const annonce = await Annonce.findById(req.params.id);

    const { id } = req.params;

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    if (!annonce.disponible) {
      return res.status(400).json({ message: "Annonce déjà louée" });
    }
    annonce.disponible = false;
    await annonce.save();

    publishToExchange({ event: "LOUER_ANNONCE", data: annonce });

    const endpoints = [`http://localhost:3002/api/consultations/${id}`];

    for (const endpoint of endpoints) {
      try {
        await axios.put(endpoint, annonce);
        console.log(`Message envoyé à ${endpoint}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi au service via REST (${endpoint}):`,
          error.message
        );
      }
    }
    res.status(200).json({
      message: "Voiture louée avec succès",
      annonce,
    });
  } catch (error) {
    console.error("Erreur lors de la location de l'annonce :", error);
    res.status(500).json({
      error: "Erreur serveur, impossible de louer l'annonce",
    });
  }
}

async function AnnonceData(req, res) {
  try {
    const annonceData = req.body;
    const annonce = new Annonce(annonceData);
    await annonce.save();

    res.status(201).json({ message: "Annonce ajoutée dans location" });
  } catch (error) {
    console.error("Erreur dans service-location :", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { louerAnnonce, AnnonceData };
