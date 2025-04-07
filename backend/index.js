'use strict'

require('dotenv').config(); 
const db = require('./app/configs/db');
const express = require('express');
const habitacionRoutes = require('./app/routes/habitacionRoutes');
const tipoHabitacionRoutes = require('./app/routes/tipoHabitacionRotes');
const estadoHabitacionRoutes = require('./app/routes/estadoHabitacionRoutes');
const detalleReservaRoutes = require('./app/routes/detallereservaRoutes');
const reservaRoutes = require('./app/routes/reservaRoutes');
const huespedRoutes= require('./app/routes/huespedRoutes');
const estadoreservaRoutes= require('./app/routes/estadoreservaRoutes');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || process.env.APP_PORT;
app.use('/habitaciones', habitacionRoutes);
app.use('/tipoHabitacion', tipoHabitacionRoutes);
app.use('/estadoHabitacion', estadoHabitacionRoutes);
app.use('/detalleReserva', detalleReservaRoutes);
app.use('/reserva', reservaRoutes);
app.use('/huesped', huespedRoutes);
app.use('/estadoreserva', estadoreservaRoutes);


// Ruta de prueba para verificar que todo funciona
app.get('/', (req, res) => {
    res.json({ message: 'API del Sistema de Hotel funcionando correctamente' });
});

db.sequelizeInstance.sync()
    .then(() => {
        console.info(`DB Synced`)
        app.listen(parseInt(PORT), function (error) {
            if (error) return console.log(error);
            console.info(`el servidor se esta ejecutando en el puerto ${PORT}`)
        })
    })
    .catch(error => {
        console.error("Fallo la sincronizacion", error);
    });