const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const ativoMiddleware = require('../middlewares/ativoMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const ownerMiddleware = require('../middlewares/ownerMiddleware');
const resourceLoader = require('../middlewares/resourceLoaderMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get(
  '/',
  authMiddleware,
  ativoMiddleware,
  roleMiddleware(['admin']),
  userController.list
);
router.get(
  '/me',
  authMiddleware,
  ativoMiddleware,
  userController.me
);
router.get(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(User),
  ownerMiddleware,
  userController.show
);
router.put(
  '/:id',
  authMiddleware,
  ativoMiddleware,
  resourceLoader(User),
  ownerMiddleware,
  userController.update
);
router.delete(
  '/:id',
  authMiddleware,
  ativoMiddleware,
 resourceLoader(User),
  ownerMiddleware,
  userController.delete
);
router.patch(
  '/:id/aprovar',
  authMiddleware,
  ativoMiddleware,
  roleMiddleware(['admin']),
 resourceLoader(User),
  userController.aprovarAdvogado
);
module.exports = router;