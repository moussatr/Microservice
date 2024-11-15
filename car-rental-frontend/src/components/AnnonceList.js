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

  // const handleLouer = async (id) => {
  //   try {
  //     const updatedAnnonce = await louerAnnonce(id);
  //     setAnnonces((prevAnnonces) =>
  //       prevAnnonces.map((annonce) =>
  //         annonce._id === id ? { ...annonce, ...updatedAnnonce } : annonce
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Erreur lors de la location :", error);
  //   }
  // };

  if (loading) {
    return <div>Chargement des annonces...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Liste des Annonces</h2>
      <ul style={styles.list}>
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
            <li key={annonce._id} style={styles.listItem}>
              <Link to={`/annonces/${annonce._id}`} style={styles.link}>
                <div style={styles.card}>
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
              {/* {annonce.disponible && (
                <button
                  onClick={() => handleLouer(annonce._id)}
                  style={styles.button}
                >
                  Louer
                </button>
              )} */}
            </li>
          ))
        ) : (
          <li>Aucune annonce disponible pour le moment.</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "20px",
    maxWidth: "800px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "20px",
  },
  card: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default AnnonceList;
