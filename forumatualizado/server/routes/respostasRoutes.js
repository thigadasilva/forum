const express = require('express');
const router = express.Router();

const RespostaController = require('../controllers/respostasController');

router.post('/', RespostaController.criar);
router.get('/:perguntaId', RespostaController.listarPorPergunta);

module.exports = router;