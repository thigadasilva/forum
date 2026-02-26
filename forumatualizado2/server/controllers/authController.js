const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'forum_juridico_secret';



exports.register = async (req, res) => {
  try {
    const { nome, email, password, perfil } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      nome,
      email,
      senha_hash: hash,
      perfil
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(password, user.senha_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id, perfil: user.perfil },
      SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};