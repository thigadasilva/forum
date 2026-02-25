const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const advogadoRoutes = require('./advogadoRoutes');
const clienteRoutes = require('./clienteRoutes');
const forumRoutes = require('./perguntasRoutes');
const perguntasRoutes = require('./perguntasRoutes');
const respostasRoutes = require('./respostasRoutes');

router.use('/perguntas', perguntasRoutes);
router.use('/respostas', respostasRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/advogado', advogadoRoutes);
router.use('/cliente', clienteRoutes);
router.use('/forum', forumRoutes);

module.exports = router;