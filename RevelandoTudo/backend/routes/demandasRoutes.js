const express = require("express")

const router = express.Router()

const controller = require("../controllers/demandasController")
const { autenticar, apenasAdmin } = require("../middleware/authMiddleware")

router.get("/", controller.getDemandas)

router.post("/", autenticar, apenasAdmin, controller.createDemanda)

router.put("/:id", autenticar, apenasAdmin, controller.updateDemanda)

router.put("/:id/status", autenticar, apenasAdmin, controller.updateStatus)

router.get("/:id/atualizacoes", controller.getAtualizacoesDemanda)

module.exports = router