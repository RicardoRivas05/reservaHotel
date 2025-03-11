'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        habitacionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precioNoche: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        img1: {
            type: DataTypes.BLOB("medium"),
            allowNull: true
        },
        img2: {
            type: DataTypes.BLOB("medium"),
            allowNull: true
        },
        img3: {
            type: DataTypes.BLOB("medium"),
            allowNull: true
        },
        tipoHabitacionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estadoHabitacionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'Habitacion',
        timestamps: false
    };

    return sequelize.define('habitacion', attributes, options);
};
