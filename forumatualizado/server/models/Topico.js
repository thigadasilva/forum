const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Topico = sequelize.define('Topico', {
  titulo: {
    type: DataTypes.STRING,
  allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status:{
    type: DataTypes.ENUM('Em andamento', 'Resolvido')
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
  allowNull: false
  }
});

//Alterar quando o banco tiver funfando 100%
//User.hasMany(Pergunta, { foreignKey: 'usuarioId' });
//Pergunta.belongsTo(User, { foreignKey: 'usuarioId' });

module.exports = Topico;