import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Reservations from './components/Reserva';
import Guests from './components/Huesped';
import Rooms from './components/Habitacion';
import RoomTypes from './components/TipoHabitacion';
import RoomStatus from './components/EstadoHabitacion';
import ReservationDetails from './components/DetalleReservacion';
import EstadoReserva from './components/EstadoReserva';
import Usuarios from './components/Usuario';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservaciones" element={<Reservations />} />
        <Route path="/huesped" element={<Guests />} />
        <Route path="/habitaciones" element={<Rooms />} />
        <Route path="/tipohabitacion" element={<RoomTypes />} />
        <Route path="/estadohabitacion" element={<RoomStatus />} />
        <Route path="/detallereserva" element={<ReservationDetails />} />
        <Route path= "/estadoreserva" element={<EstadoReserva />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;