const mongoose = require("mongoose");

const AnnonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  prixParJour: { type: Number, required: true },
  disponible: { type: Boolean, default: true },
  dateAjout: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Annonce", AnnonceSchema);
