const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultationController");

router.get("/:id", consultationController.getAnnonce);

module.exports = router;
