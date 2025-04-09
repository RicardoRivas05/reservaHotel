'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        idEstadoHabitacion: {
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
        tableName: 'estadohabitacion',
        timestamps: false
    };

    return sequelize.define('estadohabitacion', attributes, options);
};