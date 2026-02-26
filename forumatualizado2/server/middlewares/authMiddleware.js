const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};