const Pergunta = require('../models/Topico');

module.exports = {
  async listar(req, res) {
    try {
      const perguntas = await Pergunta.findAll();
      return res.json(perguntas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar perguntas' });
    }
  },

  async criar(req, res) {
    try {
      const { titulo, conteudo, categoria, usuarioId } = req.body;

      const pergunta = await Pergunta.create({
        titulo,
        conteudo,
        categoria,
        usuarioId
      });

      return res.status(201).json(pergunta);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const pergunta = await Pergunta.findByPk(id);

      if (!pergunta) {
        return res.status(404).json({ erro: 'Pergunta não encontrada' });
      }

      return res.json(pergunta);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar pergunta' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      await Pergunta.destroy({ where: { id } });

      return res.json({ mensagem: 'Pergunta removida com sucesso' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao deletar pergunta' });
    }
  }
};