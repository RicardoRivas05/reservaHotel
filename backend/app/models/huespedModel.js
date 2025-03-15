'use strict'

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const attributes = {
        huespedId: {
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
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        correoElectronico: {
            type: DataTypes.STRING(250),
            allowNull: true,
            validate: {
                isEmail: true
            }
        }
    };

    const options = {
        defaultScope: {
            attributes: { excludes: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'Huesped',
        timestamps: false
    };

    return sequelize.define('huesped', attributes, options);
};
