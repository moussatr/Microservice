const Annonce = require("../models/Annonce");
const { publishToQueue } = require("../messageBroker");

exports.louerAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    if (!annonce.disponible) {
      return res.status(400).json({ message: "Annonce déjà louée" });
    }

    annonce.disponible = false;
    await annonce.save();

    const message = {
      event: "LOUER_ANNONCE",
      data: annonce,
    };
    publishToQueue("locations", message);

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
};
