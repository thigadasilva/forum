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
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onDelete: 'CASCADE'
},
 topicoId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Topicos',
    key: 'id'
  },
  onDelete: 'CASCADE'
}
},
{
  timestamps: true,
  indexes: [
    { fields: ['topicoId'] },
    { fields: ['usuarioId'] }
  ]
}
);

User.hasMany(Resposta, { foreignKey: 'usuarioId' });
Resposta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

Topico.hasMany(Resposta, { foreignKey: 'topicoId' });
Resposta.belongsTo(Topico, { foreignKey: 'topicoId' });

module.exports = Resposta;