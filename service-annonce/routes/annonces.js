const express = require("express");
const router = express.Router();
const annonceController = require("../controllers/annonceController");

router.post("/", annonceController.createAnnonce);
module.exports = router;
