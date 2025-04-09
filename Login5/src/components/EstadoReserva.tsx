import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';

interface EstadoReserva {
  id: number;
  estado: string;
}

function EstadoReserva() {
  const navigate = useNavigate();
  const [estadoreserva, setEstadoReserva] = useState<EstadoReserva[]>([
    {
      id: 1,
      estado: "Reservada",
    }
  ]);

  const handleCreate = () => {
    // Implementar lógica de creación
  };

  const handleEdit = (id: number) => {
    // Implementar lógica de edición
  };

  const handleDelete = (id: number) => {
    // Implementar lógica de eliminación
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Estado Reserva</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo estado de reserva
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EstadoReserva Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  estado
                </th>   
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estadoreserva.map((guest) => (
                <tr key={guest.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.estado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(guest.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EstadoReserva;