const Resposta = require('../models/Resposta');
const Topico = require('../models/Topico');

exports.create = async (req, res) => {
  try {
    const { conteudo, topicoId } = req.body;

    const topico = await Topico.findByPk(topicoId);

    if (!conteudo || conteudo.trim().length < 3) {
  return res.status(400).json({
    error: 'Conteúdo inválido'
  });
}
    
    if (!topico) {
      return res.status(404).json({ error: 'Tópico não encontrado' });
    }

    if (topico.status === 'Resolvido') {
      return res.status(400).json({
        error: 'Não é possível responder um tópico resolvido'
      });
    }

      if (
      req.user.perfil === 'advogado' &&
      req.user.aprovado === false
    ) {
      return res.status(403).json({
        error: 'Advogado ainda não aprovado'
      });
    }


    const resposta = await Resposta.create({
      conteudo,
      topicoId,
      usuarioId: req.user.id
    });

    await topico.increment('respostas_count');

    res.status(201).json(resposta);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByTopico = async (req, res) => {
  try {
    const { topicoId } = req.params;

    const respostas = await Resposta.findAll({
      where: { topicoId },
      order: [['createdAt', 'ASC']],
     include: {
  model: require('../models/User'),
  as: 'usuario',
  attributes: ['id', 'nome', 'perfil', 'avatar_url']
}
    });

    res.json(respostas);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { conteudo } = req.body;

    await req.resource.update({ conteudo });

    res.json(req.resource);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const topico = await Topico.findByPk(req.resource.topicoId);
    await req.resource.destroy();
    
    await topico.decrement('respostas_count');

    res.json({ message: 'Resposta deletada com sucesso' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

