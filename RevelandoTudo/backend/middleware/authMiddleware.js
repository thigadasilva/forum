const jwt = require("jsonwebtoken")

// Verifica se o token JWT é válido
exports.autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" })
  }
}

// Verifica se o usuário tem papel de admin
exports.apenasAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.role !== 'admin') {
    return res.status(403).json({ erro: "Acesso restrito a administradores" })
  }
  next()
}
