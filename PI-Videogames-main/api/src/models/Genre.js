const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


  sequelize.define('genre', {
   Id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   Nombre:{
    type: DataTypes.STRING,
    allowNull: false,
   }
    }
  )};

