const Annonce = require("../models/Annonce");
const { publishToExchange } = require("../messageBroker");

exports.createAnnonce = async (req, res) => {
  try {
    const annonce = new Annonce(req.body);
    await annonce.save();

    publishToExchange({ event: "NEW_ANNONCE", data: annonce });

    res.status(201).json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
