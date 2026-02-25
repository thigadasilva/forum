const express = require('express');
const router = express.Router();
const advogadoController = require('../controllers/advogadoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, advogadoController.listAdvogados);

module.exports = router; 