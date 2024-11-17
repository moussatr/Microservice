const Annonce = require("../models/Annonce");

async function getAnnonce(req, res) {
  try {
    const annonce = await Annonce.findById(req.params.id);
    res.status(200).json(annonce);
  } catch (error) {
    console.error("Erreur lors de la consultation de l'annonce :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur, impossible de consulter l'annonce" });
  }
}

async function AnnonceData(req, res) {
  try {
    const annonceData = req.body;

    const annonce = new Annonce(annonceData);
    await annonce.save();

    res.status(201).json({
      message: "Annonce ajoutée avec succès dans consultation",
      annonce,
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de l'annonce dans service-consultation :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur serveur, impossible d'ajouter l'annonce." });
  }
}

async function UpdateAnnonce(req, res) {
  try {
    const { id } = req.params;
    const annonceData = req.body;

    const updatedAnnonce = await Annonce.findByIdAndUpdate(id, annonceData, {
      new: true,
    });

    if (!updatedAnnonce) {
      return res
        .status(404)
        .json({ message: "Annonce non trouvée pour mise à jour." });
    }

    res.status(200).json({
      message: "Annonce mise à jour avec succès dans consultation",
      annonce: updatedAnnonce,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'annonce dans service-consultation :",
      error
    );
    res.status(500).json({
      error: "Erreur serveur, impossible de mettre à jour l'annonce.",
    });
  }
}

module.exports = { getAnnonce, AnnonceData, UpdateAnnonce };
