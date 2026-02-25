const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Topico = require('./Topico');

const Resposta = sequelize.define('Resposta', {
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  perguntaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

//Alterar quando o banco tiver funfando 100%
//User.hasMany(Resposta, { foreignKey: 'usuarioId' });
//Resposta.belongsTo(User, { foreignKey: 'usuarioId' });

Topico.hasMany(Resposta, { foreignKey: 'perguntaId' });
Resposta.belongsTo(Topico, { foreignKey: 'perguntaId' });

module.exports = Resposta;