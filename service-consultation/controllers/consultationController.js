const Annonce = require("../models/Annonce");

exports.getAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    console.error("Erreur lors de la consultation de l'annonce :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur, impossible de consulter l'annonce" });
  }
};
