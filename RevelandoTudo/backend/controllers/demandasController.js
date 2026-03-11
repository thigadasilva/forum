const { Demanda, Categoria, AtualizacaoDemanda } = require("../models");

// Buscar todas as demandas
exports.getDemandas = async (req, res) => {
  const demandas = await Demanda.findAll({
    include: [{ model: Categoria, as: 'Categoria' }]
  });

  res.json(demandas);
};

// Criar uma nova demanda
exports.createDemanda = async (req, res) => {
  const { titulo, descricao, categoriaId, dataEsperada } = req.body;

  const demanda = await Demanda.create({
    titulo,
    descricao,
    categoriaId: categoriaId,
    userId: req.usuario.id,
    status: "Em análise",
    dataEsperada
  });

  await AtualizacaoDemanda.create({
    mensagem: "Demanda recebida e enviada para análise",
    status: "Em análise",
    demandaId: demanda.id
  });

  res.json(demanda);
};

// Atualizar o status de uma demanda
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, mensagem } = req.body;

  const demanda = await Demanda.findByPk(id);

  if (!demanda) {
    return res.status(404).json({ erro: "Demanda não encontrada" });
  }

  demanda.status = status;
  await demanda.save();

  await AtualizacaoDemanda.create({
    mensagem,
    status,
    demandaId: id
  });

  res.json(demanda);
};

// Editar uma demanda completa (admin)
exports.updateDemanda = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoriaId, status, dataEsperada, mensagem } = req.body;

  const demanda = await Demanda.findByPk(id);

  if (!demanda) {
    return res.status(404).json({ erro: "Demanda não encontrada" });
  }

  const statusMudou = demanda.status !== status;

  demanda.titulo = titulo;
  demanda.descricao = descricao;
  demanda.categoriaId = categoriaId;
  demanda.status = status;
  demanda.dataEsperada = dataEsperada;
  await demanda.save();

  if (statusMudou || (mensagem && mensagem.trim())) {
    await AtualizacaoDemanda.create({
      mensagem: mensagem && mensagem.trim()
        ? mensagem
        : `Status alterado para "${status}".`,
      status,
      demandaId: id
    });
  }

  res.json(demanda);
};

// Buscar o histórico de atualizações de uma demanda
exports.getAtualizacoesDemanda = async (req, res) => {
  const { id } = req.params;

  const atualizacoes = await AtualizacaoDemanda.findAll({
    where: { demandaId: id },
    order: [['createdAt', 'ASC']]
  });

  res.json(atualizacoes);
};