const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('Videogame', {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
            
    },
    Plataforma:{
      type: DataTypes.STRING,
      
    },
    Imagen:{
 type: DataTypes.STRING, 
 allowNull: false,
    },
    Fecha_de_lanzamiento:{
      type: DataTypes.DATE,
      
    },
    Rating:{
      type:DataTypes.STRING, 
    },
    created:{ //! created true viene de la base datos, el false de la api 
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timestamp:false});
};
