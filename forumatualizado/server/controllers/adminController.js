const User = require('../models/User');

exports.dashboard = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};