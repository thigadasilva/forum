const Topico = require('../models/Topico');
const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;

    const topico = await Topico.create({
      titulo,
      conteudo,
      usuarioId: req.user.id
    });

    res.status(201).json(topico);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const topicos = await Topico.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        association: 'User',
        attributes: ['id', 'nome', 'perfil', 'avatar_url']
      }
    });

    res.json(topicos);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    const topico = await Topico.findByPk(id, {
      include: {
        association: 'User',
        attributes: ['id', 'nome', 'perfil', 'avatar_url']
      }
    });

    if (!topico) {
      return res.status(404).json({ error: 'Tópico não encontrado' });
    }

    res.json(topico);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;

    await req.resource.update({ titulo, conteudo });

    res.json(req.resource);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await req.resource.destroy();

    res.json({ message: 'Tópico deletado com sucesso' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resolver = async (req, res) => {
  try {
    if (req.resource.status === 'Resolvido') {
      return res.status(400).json({
        error: 'Tópico já está resolvido'
      });
    }

    await req.resource.update({ status: 'Resolvido' });

    res.json({ message: 'Tópico marcado como resolvido' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};