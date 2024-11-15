import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>CarRental</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Accueil
        </Link>
        <Link to="/annonces" style={styles.link}>
          Annonces
        </Link>
        <Link to="/creer" style={styles.link}>
          Créer Annonce
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

export default Navbar;
