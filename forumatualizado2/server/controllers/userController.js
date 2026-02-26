const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const {
      nome,
      email,
      password,
      perfil,
      numero_oab,
      estado_oab
    } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Validação advogado
    if (perfil === 'advogado') {
      if (!numero_oab || !estado_oab) {
        return res.status(400).json({
          error: 'Advogado deve informar número e estado da OAB'
        });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      nome,
      email,
      senha_hash: hash,
      perfil,
      numero_oab: perfil === 'advogado' ? numero_oab : null,
      estado_oab: perfil === 'advogado' ? estado_oab : null
    });

    const { senha_hash, ...userData } = user.toJSON();

    res.status(201).json(userData);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ error: 'Usuário não encontrado' });

    if (!user.ativo)
      return res.status(403).json({ error: 'Usuário desativado' });

    if (user.perfil === 'advogado' && !user.aprovado)
      return res.status(403).json({ error: 'Advogado ainda não aprovado' });

    const valid = await bcrypt.compare(password, user.senha_hash);

    if (!valid)
      return res.status(401).json({ error: 'Senha inválida' });

    const token = jwt.sign(
      { id: user.id, perfil: user.perfil },
      SECRET,
      { expiresIn: '1d' }
    );

    const { senha_hash, ...userData } = user.toJSON();

    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['senha_hash'] }
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    await user.update(req.body);

    const { senha_hash, ...userData } = user.toJSON();

    res.json(userData);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.aprovarAdvogado = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user || user.perfil !== 'advogado') {
      return res.status(404).json({ error: 'Advogado não encontrado' });
    }

    user.aprovado = true;
    await user.save();

    res.json({ message: 'Advogado aprovado com sucesso' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};