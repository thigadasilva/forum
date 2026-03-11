const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoriasController");

router.get("/", controller.getCategorias);

module.exports = router;
