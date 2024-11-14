import React, { useEffect, useState } from "react";
import { getAnnonces } from "../services/listingService";
import { Link } from "react-router-dom";

const AnnonceList = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnnonces();
        setAnnonces(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des annonces:", err);
        setError("Une erreur s'est produite lors du chargement des annonces.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement des annonces...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liste des Annonces</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
            <li key={annonce._id} style={{ marginBottom: "20px" }}>
              <Link
                to={`/annonces/${annonce._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <strong>{annonce.titre}</strong> - {annonce.prixParJour}€/jour
                  <div
                    style={{
                      marginTop: "10px",
                      color: annonce.disponible ? "green" : "red",
                    }}
                  >
                    <strong>
                      {annonce.disponible ? "Disponible" : "Indisponible"}
                    </strong>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>Aucune annonce disponible pour le moment.</li>
        )}
      </ul>
    </div>
  );
};

export default AnnonceList;
