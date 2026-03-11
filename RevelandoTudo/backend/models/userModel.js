const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define("User", {

 nome: {
  type: DataTypes.STRING,
  allowNull: false
 },

 email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
 },

 senha: {
  type: DataTypes.STRING,
  allowNull: false
 },

 cargo: {
  type: DataTypes.STRING,
  allowNull: false
 },

 role: {
  type: DataTypes.ENUM('admin', 'student'),
  allowNull: false,
  defaultValue: 'student'
 }

})

module.exports = User