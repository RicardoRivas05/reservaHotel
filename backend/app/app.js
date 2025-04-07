const express = require('express');
const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const userRoutes = require('./routes/userRoutes');
const tipoHabitacionRoutes = require('./routes/tipoHabitacionRotes');
const estadoHabitacionRoutes = require('./routes/estadoHabitacionRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const huespedRoutes= require('./routes/huespedRoutes');
const estadoreservaRoutes= require('./routes/estadoReservaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const detalleReservaRoutes = require('./routes/detalleReservaRoutes');

App.use('/api/users', userRoutes);
App.use('/api/tipoHabitacion', tipoHabitacionRoutes);
App.use('/api/estadoHabitacion', estadoHabitacionRoutes);
App.use('/api/habitaciones', habitacionRoutes);
App.use('/api/huesped', huespedRoutes);
App.use('/api/estadoreserva', estadoreservaRoutes);
App.use('/api/reserva', reservaRoutes);
App.use('/api/detalleReserva', detalleReservaRoutes);

module.exports = App;