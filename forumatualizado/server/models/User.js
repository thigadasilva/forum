const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('admin', 'advogado', 'cliente'),
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    DefaultValue: true
  },
  numero_oab:{
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  estado_oab: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aprovado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    DefaultValue: false
  }
});

module.exports = User;