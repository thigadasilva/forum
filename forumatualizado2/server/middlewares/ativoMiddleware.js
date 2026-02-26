const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(401).json({
        error: 'Usuário não encontrado'
      });
    }

    if (!user.ativo) {
      return res.status(403).json({
        error: 'Usuário desativado'
      });
    }

    
    req.user = {
      id: user.id,
      perfil: user.perfil,
      ativo: user.ativo
    };

    next();

  } catch (err) {
    return res.status(500).json({
      error: 'Erro ao validar usuário'
    });
  }
};