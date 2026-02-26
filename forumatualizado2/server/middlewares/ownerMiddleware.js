module.exports = (Model) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const resource = await Model.findByPk(id);

      if (!resource) {
        return res.status(404).json({
          error: 'Recurso não encontrado'
        });
      }

      if (req.user.perfil === 'admin') {
        req.resource = resource;
        return next();
      }

      if (resource.usuarioId !== req.user.id) {
        return res.status(403).json({
          error: 'Você não tem permissão para modificar este recurso'
        });
      }

      req.resource = resource;
      next();

    } catch (err) {
      return res.status(500).json({
        error: 'Erro ao validar propriedade do recurso'
      });
    }
  };
};