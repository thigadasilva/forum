const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, clienteController.listClientes);

module.exports = router; 