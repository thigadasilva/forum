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
    type: DataTypes.ENUM('Em andamento', 'Resolvido'),
    allowNull: false,
    defaultValue: 'Em andamento'
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  respostas_count: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0
},
 usuarioId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onDelete: 'CASCADE'
}
},
{
  timestamps: true,
  indexes: [
  { fields: ['usuarioId'] },
  { fields: ['status'] }
]
}
);

User.hasMany(Topico, { foreignKey: 'usuarioId' });
Topico.belongsTo(User, { foreignKey: 'usuarioId' });

module.exports = Topico;