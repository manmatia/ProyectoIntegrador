const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "Videogame",
    {
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Genero:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        
      },
      Descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Plataforma: {
        // type: DataTypes.STRING,
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      Imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Lanzamiento: {
        type: DataTypes.DATEONLY,
      },
      Rating: {
       type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
      },
      created: {
        //! created true viene de la base datos, el false de la api
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamp: false }
  );
};
