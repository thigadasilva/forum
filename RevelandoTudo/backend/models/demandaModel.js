const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Demanda = sequelize.define("Demanda", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Em análise"
  },
  dataAbertura: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dataEsperada: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'Demandas',
  freezeTableName: true
})

module.exports = Demanda