import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { getHabitacion, createHabitacion, updateHabitacion, deleteHabitacion } from '../services/habitacionService';

interface Habitacion {
  idHabitacion?: number;
  numero: string;
  capacidad: string;
  precioNoche: string;
  idTipoHabitacion: string;
  idEstadoHabitacion: string;
}

function Habitaciones() {
  const navigate = useNavigate();
  const [rooms, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para el modal/formulario
  const [showModal, setShowModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Habitacion | null>(null);
  const [formData, setFormData] = useState<Habitacion>({
    numero: '',
    capacidad: '',
    precioNoche: '',
    idTipoHabitacion: '',
    idEstadoHabitacion: '',
  });

  // Cargar habitaciones al montar el componente
  useEffect(() => {
    fetchHabitaciones();
  }, []);

  // Función para obtener todas las habitaciones
  const fetchHabitaciones = async () => {
    try {
      setLoading(true);
      const response = await getHabitacion();
      setHabitaciones(response.data);
      setError('');
    } catch (err) {
      console.error('Error al cargar habitaciones:', err);
      setError('Error al cargar las habitaciones. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal para crear nueva habitación
  const handleCreate = () => {
    setCurrentRoom(null);
    setFormData({
      numero: '',
      capacidad: '',
      precioNoche: '',
      idTipoHabitacion: '',
      idEstadoHabitacion: '',
    });
    setShowModal(true);
  };

  // Guardar nueva habitación o actualizar existente
  const handleSave = async () => {
    try {
      if (currentRoom && currentRoom.idHabitacion) {
        // Actualizar habitación existente
        await updateHabitacion(currentRoom.idHabitacion, formData);
      } else {
        // Crear nueva habitación
        await createHabitacion(formData);
      }
      
      // Actualizar la lista de habitaciones
      fetchHabitaciones();
      setShowModal(false);
    } catch (err) {
      console.error('Error al guardar la habitación:', err);
      alert('Error al guardar la habitación. Por favor, intente de nuevo.');
    }
  };

  // Editar habitación existente
  const handleEdit = (id: number) => {
    const roomToEdit = rooms.find(room => room.idHabitacion === id);
    if (roomToEdit) {
      setCurrentRoom(roomToEdit);
      setFormData({
        numero: roomToEdit.numero,
        capacidad: roomToEdit.capacidad,
        precioNoche: roomToEdit.precioNoche,
        idTipoHabitacion: roomToEdit.idTipoHabitacion,
        idEstadoHabitacion: roomToEdit.idEstadoHabitacion,
      });
      setShowModal(true);
    }
  };

  // Eliminar habitación
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      try {
        await deleteHabitacion(id);
        // Actualizar la lista después de eliminar
        fetchHabitaciones();
      } catch (err) {
        console.error('Error al eliminar la habitación:', err);
        alert('Error al eliminar la habitación. Por favor, intente de nuevo.');
      }
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
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Habitaciones</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nueva Habitación
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Indicador de carga */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          /* Tabla de habitaciones */
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {rooms.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No hay habitaciones disponibles. Haga clic en "Nueva Habitación" para agregar una.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Número
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Noche
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room) => (
                    <tr key={room.idHabitacion}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.idHabitacion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.numero}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.capacidad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${room.precioNoche}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.idTipoHabitacion === '1' ? 'Individual' : 
                         room.idTipoHabitacion === '2' ? 'Doble' : 'Suite'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${room.idEstadoHabitacion === '1' ? 'bg-green-100 text-green-800' :
                          room.idEstadoHabitacion === '2' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {room.idEstadoHabitacion === '1' ? 'Disponible' : 
                           room.idEstadoHabitacion === '2' ? 'Ocupada' : 'Mantenimiento'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(room.idHabitacion!)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(room.idHabitacion!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Modal para crear/editar */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {currentRoom ? 'Editar Habitación' : 'Nueva Habitación'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                  <input
                    type="text"
                    name="capacidad"
                    value={formData.capacidad}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio por Noche</label>
                  <input
                    type="text"
                    name="precioNoche"
                    value={formData.precioNoche}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Habitación</label>
                  <select
                    name="idTipoHabitacion"
                    value={formData.idTipoHabitacion}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1">Individual</option>
                    <option value="2">Doble</option>
                    <option value="3">Suite</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    name="idEstadoHabitacion"
                    value={formData.idEstadoHabitacion}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1">Disponible</option>
                    <option value="2">Ocupada</option>
                    <option value="3">Mantenimiento</option>
                  </select>
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
                  {currentRoom ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habitaciones;