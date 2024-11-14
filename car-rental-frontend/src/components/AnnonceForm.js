import React, { useState } from "react";
import { createAnnonce } from "../services/annonceService";

const AnnonceForm = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prixParJour, setPrixParJour] = useState("");
  const [disponible, setDisponible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnonce({ titre, prixParJour, description, disponible });
      alert("Annonce créée avec succès!");

      setTitre("");
      setDescription("");
      setPrixParJour("");
      setDisponible(true);
    } catch (error) {
      alert("Erreur lors de la création de l'annonce.");
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer une nouvelle annonce</h2>

      <label>Titre</label>
      <input
        type="text"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Prix par jour</label>
      <input
        type="number"
        value={prixParJour}
        onChange={(e) => setPrixParJour(e.target.value)}
        required
      />

      <label>Disponible</label>
      <input
        type="checkbox"
        checked={disponible}
        onChange={() => setDisponible(!disponible)}
      />

      <button type="submit">Créer</button>
    </form>
  );
};

export default AnnonceForm;
