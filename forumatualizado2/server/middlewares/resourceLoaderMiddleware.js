module.exports = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findByPk(req.params.id);

      if (!resource) {
        return res.status(404).json({
          error: 'Recurso não encontrado'
        });
      }

      req.resource = resource;

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};