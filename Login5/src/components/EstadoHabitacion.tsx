import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { getEstadoHabitacion, createEstadoHabitacion, updateEstadoHabitacion, deleteEstadoHabitacion } from '../services/estadoHabitacionService';
import { ModalEstadoHabitacion } from './ModalEstadoHabitacion';

interface EstadoHabitacion {
  idEstadoHabitacion: number;
  estado: string;
}

function EstadoHabitacion() {
  const navigate = useNavigate();
  const [EstadoHabitaciones, setEstadoHabitaciones] = useState<EstadoHabitacion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoHabitacionSeleccionado, setEstadoHabitacionSeleccionado] = useState<EstadoHabitacion | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    fetchEstadoHabitaciones();
  }, []);

  const fetchEstadoHabitaciones = async () => {
    try {
      const response = await getEstadoHabitacion();
      setEstadoHabitaciones(response.data);
    } catch (error) {
      console.error('Error al cargar los huéspedes', error);
    }
  }

  const handleGuardarEstadoHabitacion = async (estadoHabitacion: EstadoHabitacion) => {
    try {
      setLoading(true);
      
      // Validacion para ver si existe el id, si existe se actualiza, si no se crea uno nuevo
      if (estadoHabitacion.idEstadoHabitacion) {
        await updateEstadoHabitacion(estadoHabitacion.idEstadoHabitacion, estadoHabitacion);
      } else {
        await createEstadoHabitacion(estadoHabitacion);
      }
      
      // Se llama a la funcion para obtener los estadoHabitaciones nuevamente y actualizar la tabla
      await fetchEstadoHabitaciones();
      
      // Cerrar el modal
      setModalVisible(false);
      
    } catch (err) {
      setError("Error al guardar el estado habitacion");
      console.error("Error guardando estado habitacion:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEstadoHabitacionSeleccionado(null);  // Para crear un nuevo estado, no se selecciona ninguno
    setModoEdicion(false);
    setModalVisible(true);
  };
  
  const handleEdit = (estadoHabitacion: EstadoHabitacion) => {
    setEstadoHabitacionSeleccionado(estadoHabitacion); // Se le pasa el estadoHabitacion seleccionado al modal
    setModoEdicion(true); // Para indicar que estamos en modo edición
    setModalVisible(true);
  };
  

  const handleDelete = async(id: number) => {
    try {
      await deleteEstadoHabitacion(id); // Llamada a la API para eliminar el estado y se le pasa el id del registro
      fetchEstadoHabitaciones();
    } catch (error) {
      console.error('Error al eliminar huésped', error);
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
            <h1 className="text-2xl font-bold text-gray-900">Estado de Habitaciones</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Estado
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Habitación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {EstadoHabitaciones.map((status) => (
                <tr key={status.idEstadoHabitacion}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {status.idEstadoHabitacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {status.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(status)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(status.idEstadoHabitacion)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalVisible && (
          <ModalEstadoHabitacion
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            estadoHabitacion={estadoHabitacionSeleccionado}
            onGuardar={handleGuardarEstadoHabitacion}
          />
        )}
        </div>
      </div>
    </div>
  );
}

export default EstadoHabitacion;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}