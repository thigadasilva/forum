const User = require('../models/User');

exports.listClientes = async (req, res) => {
  const clientes = await User.findAll({ where: { role: 'cliente' } });
  res.json(clientes);
};