import React, { useState } from "react";
import { createAnnonce } from "../services/annonceService";

const AnnonceForm = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prixParJour, setPrixParJour] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnonce({ titre, prixParJour, description, disponible });
      setMessage("Annonce créée avec succès !");
      setTitre("");
      setDescription("");
      setPrixParJour("");
      setDisponible(true);
    } catch (error) {
      setMessage("Erreur lors de la création de l'annonce.");
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Créer une nouvelle annonce</h2>

        {message && <div style={styles.message}>{message}</div>}

        <label style={styles.label}>Titre</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />

        <label style={styles.label}>Prix par jour</label>
        <input
          type="number"
          value={prixParJour}
          onChange={(e) => setPrixParJour(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.checkboxContainer}>
          <label style={styles.label}>Disponible</label>
          <input
            type="checkbox"
            checked={disponible}
            onChange={() => setDisponible(!disponible)}
            style={styles.checkbox}
          />
        </div>

        <button type="submit" style={styles.button}>
          Créer
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    resize: "vertical",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  checkbox: {
    marginLeft: "10px",
    transform: "scale(1.5)",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginBottom: "15px",
    padding: "10px",
    color: "white",
    backgroundColor: "#4CAF50",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export default AnnonceForm;
