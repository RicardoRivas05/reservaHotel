'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        idDetalleReserva: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idReserva: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'reserva',
                key: 'idReserva'
            }
        },
        idHabitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'habitacion',
                key: 'idHabitacion'
            }
        },
        subTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        cantidadNoches: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        tableName: 'detallereserva',
        timestamps: false
    };

    return sequelize.define('DetalleReserva', attributes, options);
};
