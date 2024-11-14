const mongoose = require("mongoose");

const AnnonceSchema = new mongoose.Schema({
  titre: String,
  description: String,
  prixParJour: Number,
  disponible: Boolean,
  dateAjout: Date,
});

module.exports = mongoose.model("Annonce", AnnonceSchema);
