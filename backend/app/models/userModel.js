'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        usuario:{
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING(45)
        },
    };
    const options = {
        defaultScope: {
            attributes: { excludes: ['createdAt', 'updatedAt'] }
        },
        tableName: 'usuario',
        timestamps: false
    };
    return sequelize.define('users', attributes, options);
};