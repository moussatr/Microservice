const express = require("express");
const router = express.Router();
const { louerAnnonce } = require("../controllers/locationController");

router.post("/:id/louer", louerAnnonce);

module.exports = router;
