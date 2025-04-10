const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EstadoReserva = sequelize.define('estadoreserva', {
    idEstadoReserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 60]
      }
    }
  }, {
    tableName: 'estadoreserva',
    timestamps: false
  });

  return EstadoReserva;
};