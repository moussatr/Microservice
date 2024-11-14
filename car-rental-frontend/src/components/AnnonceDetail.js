import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnnonceById } from "../services/annonceService"; 
const AnnonceDetail = () => {
  const { id } = useParams(); 
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const data = await getAnnonceById(id); 
        setAnnonce(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de l'annonce:", err);
        setError("Une erreur s'est produite lors du chargement de l'annonce.");
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) {
    return <div>Chargement des détails de l'annonce...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!annonce) {
    return <div>Aucune annonce trouvée.</div>;
  }

  return (
    <div>
      <h2>Détails de l'annonce</h2>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <strong>{annonce.titre}</strong>
        <p>{annonce.description}</p>
        <p>Prix : {annonce.prixParJour}€/jour</p>
        <p>
          Disponibilité : {annonce.disponible ? "Disponible" : "Indisponible"}
        </p>
      </div>
    </div>
  );
};

export default AnnonceDetail;
