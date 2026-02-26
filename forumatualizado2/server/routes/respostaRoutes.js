const express = require('express');
const router = express.Router();

const respostaController = require('../controllers/respostaController');

const authMiddleware = require('../middlewares/authMiddleware');
const ativoMiddleware = require('../middlewares/ativoMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ownerMiddleware = require('../middlewares/ownerMiddleware');
const resourceLoader = require('../middlewares/resourceLoaderMiddleware');

router.post(
  '/',
  authMiddleware,
  ativoMiddleware,
  respostaController.create
);
router.get(
  '/topico/:topicoId',
  respostaController.listByTopico
);
router.put(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(Resposta),
  ownerMiddleware,
  respostaController.update
);
router.delete(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(Resposta),
  ownerMiddleware,
  respostaController.delete
);

module.exports = router;