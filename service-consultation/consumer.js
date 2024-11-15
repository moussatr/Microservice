const Annonce = require("./models/Annonce");
const { consumeQueue } = require("./messageBroker");

consumeQueue("annonces_consultation", async (message) => {
  console.log("Message reçu dans service-consultation :", message);

  const { event, data } = message;

  if (event === "NEW_ANNONCE") {
    console.log("Nouvelle annonce reçue dans service-consultation :", data);
    try {
      let annonce = await Annonce.findById(data._id);
      if (!annonce) {
        annonce = new Annonce(data);
        await annonce.save();
        console.log("Annonce créée avec succès dans service-consultation");
      } else {
        annonce.titre = data.titre;
        annonce.description = data.description;
        annonce.prixParJour = data.prixParJour;
        annonce.disponible = data.disponible;
        await annonce.save();
        console.log("Annonce mise à jour dans service-consultation");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'annonce dans service-consultation :",
        error
      );
    }
  }
});
