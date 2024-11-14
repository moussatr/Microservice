// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Accueil</Link> | <Link to="/annonces">Annonces</Link> |{" "}
      <Link to="/creer">Créer Annonce</Link>
    </nav>
  );
};

export default Navbar;
