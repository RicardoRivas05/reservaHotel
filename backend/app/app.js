const express = require('express');
const App = express();
const path = require('path');

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

App.use(cors());
App.use(cors({
    origin: '*', // Cambia '*' por el dominio del frontend si es necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const userRoutes = require('./routes/userRoutes');
const tipoHabitacionRoutes = require('./routes/tipoHabitacionRotes');
const estadoHabitacionRoutes = require('./routes/estadoHabitacionRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const huespedRoutes= require('./routes/huespedRoutes');
const estadoreservaRoutes= require('./routes/estadoReservaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const detalleReservaRoutes = require('./routes/detalleReservaRoutes');
const estadoreservaRoutes = require('./routes/estadoReservaRoutes');

App.use('/api/users', userRoutes);
App.use('/api/tipoHabitacion', tipoHabitacionRoutes);
App.use('/api/estadoHabitacion', estadoHabitacionRoutes);
App.use('/api/habitaciones', habitacionRoutes);
App.use('/api/huesped', huespedRoutes);
App.use('/api/estadoreserva', estadoreservaRoutes);
App.use('/api/reserva', reservaRoutes);
App.use('/api/detalleReserva', detalleReservaRoutes);
App.use('/api/estadoreserva', estadoreservaRoutes);

module.exports = App;