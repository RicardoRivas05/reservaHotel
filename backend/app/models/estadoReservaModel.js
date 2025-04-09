'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        idEstadoReserva: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'estadoreserva',
        timestamps: false
    };

    return sequelize.define('estadoreserva', attributes, options);
};