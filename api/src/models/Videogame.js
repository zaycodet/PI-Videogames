const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    imagen: {
      type: DataTypes.STRING,
    },
    fecha_lanzamiento: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
    },
  }, {
    timestamps: false, // Desactivar la creación de createdAt y updatedAt
  });
}
