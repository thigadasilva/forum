const express = require('express');
const router = express.Router();

const PerguntaController = require('../controllers/perguntasController');

router.get('/', PerguntaController.listar);
router.post('/', PerguntaController.criar);
router.get('/:id', PerguntaController.buscarPorId);
router.delete('/:id', PerguntaController.deletar);

module.exports = router;