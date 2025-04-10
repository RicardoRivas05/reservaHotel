'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        idReserva: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechaCheckIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fechaCheckOut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        idHuesped: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'huesped',
                key: 'idHuesped'
            }
        },
        idEstadoReserva: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estadoreserva',
                key: 'idEstadoReserva'
            }
        },
        userId: {
            type: DataTypes.STRING(45),
            allowNull: true,
            references: {
                model: 'usuario',
                key: 'userId'
            }
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        tableName: 'reserva',
        timestamps: false
    };

    return sequelize.define('reserva', attributes, options);
};
