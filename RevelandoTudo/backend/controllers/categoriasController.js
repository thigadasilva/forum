const { Categoria } = require("../models");

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['nome', 'ASC']]
    });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};
