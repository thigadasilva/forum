const Resposta = require('../models/Resposta');

module.exports = {
  async criar(req, res) {
    const { conteudo, perguntaId } = req.body;

    const resposta = await Resposta.create({
      conteudo,
      usuarioId,
      perguntaId
    });

    return res.json(resposta);
  },

  async listarPorPergunta(req, res) {
    const { perguntaId } = req.params;

    const respostas = await Resposta.findAll({
      where: { perguntaId }
    });

    return res.json(respostas);
  }
};