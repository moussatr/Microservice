const Annonce = require("./models/Annonce");
const { consumeQueue } = require("./messageBroker");

consumeQueue("annonces_listing", async (message) => {

  const { event, data } = message;

  if (event === "NEW_ANNONCE") {
    console.log("Nouvelle annonce reçue :", data);
    try {
      let annonce = await Annonce.findById(data._id);
      if (!annonce) {
        annonce = new Annonce(data);
        await annonce.save();
        console.log("Annonce créée dans service-listing");
      } else {
        annonce.titre = data.titre;
        annonce.description = data.description;
        annonce.prixParJour = data.prixParJour;
        annonce.disponible = data.disponible;
        await annonce.save();
        console.log("Annonce mise à jour dans service-listing");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
    }
  }

  if (event === "LOUER_ANNONCE") {
    console.log("Nouvelle annonce reçue :", data);
    try {
      let annonce = await Annonce.findById(data._id);
      if (!annonce) {
        annonce = new Annonce(data);
        await annonce.save();
        console.log("Annonce créée dans service-listing");
      } else {
        annonce.titre = data.titre;
        annonce.description = data.description;
        annonce.prixParJour = data.prixParJour;
        annonce.disponible = data.disponible;
        await annonce.save();
        console.log("Annonce mise à jour dans service-listing");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
    }
  }
});
