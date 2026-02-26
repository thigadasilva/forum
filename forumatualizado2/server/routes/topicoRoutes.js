const express = require('express');
const router = express.Router();

const topicoController = require('../controllers/topicoController');

const authMiddleware = require('../middlewares/authMiddleware');
const ativoMiddleware = require('../middlewares/ativoMiddleware');
const ownerMiddleware = require('../middlewares/ownerMiddleware');
const resourceLoader = require('../middlewares/resourceLoader');

const Topico = require('../models/Topico');

router.post(
  '/',
  authMiddleware,
  ativoMiddleware,
  topicoController.create
);
router.get(
  '/',
  topicoController.list
);
router.get(
  '/:id',
  resourceLoader(Topico),
  topicoController.show
);
router.put(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(Topico),
  ownerMiddleware,
  topicoController.update
);
router.delete(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(Topico),
  ownerMiddleware,
  topicoController.delete
);
router.patch(
  '/:id/resolver',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(Topico),
  ownerMiddleware,
  topicoController.resolver
);
module.exports = router;