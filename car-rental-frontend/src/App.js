// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Annonces from "./pages/Annonces";
import Navbar from "./components/Navbar";
import AnnonceForm from "./components/AnnonceForm";
import AnnonceList from "./components/AnnonceList";
import AnnonceDetail from "./components/AnnonceDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/creer" element={<AnnonceForm />} />
        <Route path="/" element={<AnnonceList />} />
        <Route path="/annonces/:id" element={<AnnonceDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
