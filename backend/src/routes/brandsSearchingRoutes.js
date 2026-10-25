const express = require("express");
const router = express.Router();
const brandController = require("../Controllers/brandController");
const authmiddleware = require("../middlewares/authmiddleware");

router.get("/searchBrands", authmiddleware.authDesigner, brandController.searchBrands);

module.exports = router;