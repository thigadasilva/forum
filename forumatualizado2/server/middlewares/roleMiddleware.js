module.exports = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.perfil)) {
      return res.status(403).json({
        error: 'Acesso não autorizado'
      });
    }

    next();
  };
};