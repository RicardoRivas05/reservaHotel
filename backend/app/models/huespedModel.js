'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        idHuesped: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        correoElectronico: {
            type: DataTypes.STRING(250),
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'huesped',
        timestamps: false
    };

    return sequelize.define('huesped', attributes, options);
};
