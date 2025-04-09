'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        idHabitacion: {
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
        idTipoHabitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipohabitacion',
                key: 'idTipoHabitacion'
            }
        },
        idEstadoHabitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estadohabitacion',
                key: 'idEstadoHabitacion'
            }
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'habitacion',
        timestamps: false
    };

    return sequelize.define('habitacion', attributes, options);
};
