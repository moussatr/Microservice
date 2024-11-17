const express = require("express");
const router = express.Router();
const Annonce = require("../models/Annonce");
const consultationController = require("../controllers/consultationController");

router.get("/:id", consultationController.getAnnonce);

router.post("/annonces", consultationController.AnnonceData);

router.put("/:id", consultationController.UpdateAnnonce);

module.exports = router;
