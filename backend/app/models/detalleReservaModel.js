const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('estadoreserva', {
    idEstadoReserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    tableName: 'estadoreserva',
    timestamps: false
  });
};