const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.put("/:id/louer", locationController.louerAnnonce);

module.exports = router;
