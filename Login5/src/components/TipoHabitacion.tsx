import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';

interface TipoHabitacion {
  id: number;
  nombre: string;
}

function TipoHabitaciones() {
  const navigate = useNavigate();
  const [roomTypes, setTipoHabitaciones] = useState<TipoHabitacion[]>([
    {
      id: 1,
      nombre: "Habitación Doble",
    }
  ]);

  // Estado para el modal/formulario
  const [showModal, setShowModal] = useState(false);
  const [currentRoomType, setCurrentRoomType] = useState<TipoHabitacion | null>(null);
  const [formData, setFormData] = useState<Omit<TipoHabitacion, 'id'>>({
    nombre: '',
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal para crear nuevo tipo de habitacion
  const handleCreate = () => {
    setCurrentRoomType(null);
    setFormData({
      nombre: '',
    });
    setShowModal(true);
  };

  // Guardar nuevo tipo habitacion o actualizar existente
  const handleSave = () => {
    if (currentRoomType) {
      // Actualizar tipo habitación existente
      setTipoHabitaciones(roomTypes.map(roomType => 
        roomType.id === currentRoomType.id ? { ...formData, id: currentRoomType.id } : roomType
      ));
    } else {
      // Crear nueva habitación
      const newRoomType: TipoHabitacion = {
        ...formData,
        id: Math.max(0, ...roomTypes.map(r => r.id)) + 1,
      };
      setTipoHabitaciones([...roomTypes, newRoomType]);
    }
    setShowModal(false);
  };

  // Editar tipo habitación existente
  const handleEdit = (id: number) => {
    const roomTypeToEdit = roomTypes.find(roomType => roomType.id === id);
    if (roomTypeToEdit) {
      setCurrentRoomType(roomTypeToEdit);
      setFormData({
        nombre: roomTypeToEdit.nombre,
      });
      setShowModal(true);
    }
  };

  // Eliminar tipo habitación
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este Tipo Habitación?')) {
      setTipoHabitaciones(roomTypes.filter(roomType => roomType.id !== id));
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Tipos de Habitación</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Tipo
          </button>
        </div>

        {/* Modal para crear/editar */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {currentRoomType ? 'Editar Tipo Habitación' : 'Nuevo Tipo Habitación'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  {currentRoomType ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Tipo habitacion */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roomTypes.map((type) => (
                <tr key={type.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {type.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {type.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(type.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
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

export default TipoHabitaciones;