'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        idTipoHabitacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'tipohabitacion',
        timestamps: false
    };

    return sequelize.define('tipohabitacion', attributes, options);
};