const { consumeQueue } = require("./messageBroker");
const Location = require("./models/Annonce");

consumeQueue("annonces_locations", async (message) => {
  const { event, data } = message;

  if (event === "LOUER_ANNONCE") {
    console.log("Message reçu dans le service de location :", data);

    try {
      const location = new Location({
        annonceId: data._id,
        titre: data.titre,
        description: data.description,
        prixParJour: data.prixParJour,
        dateLocation: new Date(),
        clientId: "12345",
      });

      await location.save();
      console.log("Location enregistrée avec succès dans service-location");
    } catch (error) {
      console.error("Erreur lors du traitement de la location :", error);
    }
  }
});
