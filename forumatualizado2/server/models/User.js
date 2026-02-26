const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
    defaultValue: true
  },
  numero_oab:{
    type: DataTypes.STRING,
    allowNull: true
  },
  estado_oab: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'https://static.vecteezy.com/ti/vetor-gratis/p1/9292244-default-avatar-icon-vector-of-social-media-user-vetor.jpg'
  },
  aprovado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},
{
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['numero_oab', 'estado_oab']
    }
  ]
}
);

module.exports = User;