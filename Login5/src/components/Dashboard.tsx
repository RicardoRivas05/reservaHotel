import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Bed, Calendar, ClipboardList, Home, DoorOpen, LogOut, Hotel } from 'lucide-react';

const menuItems = [
  {
    title: 'Reservas',
    icon: Calendar,
    description: 'Gestionar reservaciones',
    path: '/reservaciones',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Huéspedes',
    icon: Users,
    description: 'Administrar huéspedes',
    path: '/huesped',
    color: 'bg-teal-100 text-teal-600'
  },
  {
    title: 'Habitaciones',
    icon: Bed,
    description: 'Control de habitaciones',
    path: '/habitaciones',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    title: 'Tipos de Habitación',
    icon: Home,
    description: 'Configurar tipos de habitación',
    path: '/tipohabitacion',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Estado de Habitación',
    icon: DoorOpen,
    description: 'Monitorear estado de habitaciones',
    path: '/estadohabitacion',
    color: 'bg-teal-100 text-teal-600'
  },
  {
    title: 'Detalles de Reserva',
    icon: ClipboardList,
    description: 'Ver detalles de reservaciones',
    path: '/detallereserva',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    title: "Estado de Reserva",
    icon: ClipboardList,
    description: "Ver estado de reservaciones",
    path: '/estadoreserva',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    title: "Usuario",
    icon: Users,
    description: "Visualiza a todos los usuarios",
    path: '/usuarios',
    color: 'bg-cyan-100 text-cyan-600'
  }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Hotel className="h-8 w-8 text-teal-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
              Sistema de Gestión Hotelera
            </h1>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
            <LogOut className="h-5 w-5" />
            <span>Salir</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200 group"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;