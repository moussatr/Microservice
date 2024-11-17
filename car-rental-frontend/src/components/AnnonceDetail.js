import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnnonceById, louerAnnonce } from "../services/annonceService";
const AnnonceDetail = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleLouer = async () => {
    try {
      const updatedAnnonce = await louerAnnonce(id);
      setAnnonce(updatedAnnonce);
      setSuccessMessage("La voiture a été louée avec succès !");
    } catch (error) {
      setError("Erreur lors de la location. Veuillez réessayer.");
    }
  };

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
          marginBottom: "20px",
        }}
      >
        <strong>{annonce.titre}</strong>
        <p>{annonce.description}</p>
        <p>Prix : {annonce.prixParJour}€/jour</p>
        <p>
          Disponibilité :{" "}
          <span style={{ color: annonce.disponible ? "green" : "red" }}>
            {annonce.disponible ? "Disponible" : "Indisponible"}
          </span>
        </p>
      </div>
      {successMessage && (
        <div
          style={{
            color: "green",
            marginBottom: "20px",
            border: "1px solid green",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {successMessage}
        </div>
      )}
      {annonce.disponible ? (
        <button
          onClick={handleLouer}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Louer cette annonce
        </button>
      ) : (
        <p style={{ color: "red" }}>Cette annonce n'est plus disponible.</p>
      )}
    </div>
  );
};

export default AnnonceDetail;
