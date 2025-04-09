import React, { useEffect, useState } from 'react';
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

const ProtectedRoute: React.FC<{ children: React.ReactNode; isAuthenticated: boolean }> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (newToken?: string, newUserId?: string) => {
    if (newToken && newUserId) {
      setToken(newToken);
      setUserId(newUserId);
      setIsAuthenticated(true);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken('');
    setUserId('');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard userId={userId} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        
        <Route path="/reservaciones" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Reservations />
          </ProtectedRoute>
        } />
        
        <Route path="/huesped" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Guests />
          </ProtectedRoute>
        } />
        
        <Route path="/habitaciones" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Rooms />
          </ProtectedRoute>
        } />
        
        <Route path="/tipohabitacion" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <RoomTypes />
          </ProtectedRoute>
        } />
        
        <Route path="/estadohabitacion" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <RoomStatus />
          </ProtectedRoute>
        } />
        
        <Route path="/detallereserva" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ReservationDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/estadoreserva" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EstadoReserva />
          </ProtectedRoute>
        } />
        
        <Route path="/usuarios" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Usuarios />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;