const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const Annonce = require("../models/Annonce");

router.put("/:id/louer", locationController.louerAnnonce);

router.post("/annonces", locationController.AnnonceData);

module.exports = router;
