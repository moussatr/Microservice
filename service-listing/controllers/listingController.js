const Annonce = require("../models/Annonce");

exports.listAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur, impossible de récupérer les annonces." });
  }
};
