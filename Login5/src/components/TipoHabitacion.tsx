import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { getTipoHabitacion, createTipoHabitacion, updateTipoHabitacion, deleteTipoHabitacion } from '../services/tipoHabitacionService';
import { ModalTipoHabitacion } from './ModalTipoHabitacion';

interface TipoHabitacion {
  idTipoHabitacion: number;
  nombre: string;
}

function TipoHabitacion() {
  const navigate = useNavigate();
  const [tipohabitaciones, setTipoHabitacion] = useState<TipoHabitacion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipohabitacionSeleccionado, setTipoHabitacionSeleccionado] = useState<TipoHabitacion | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
      fetchTipoHabitacion();
    }, []);

  const fetchTipoHabitacion = async () => {
      try {
        const response = await getTipoHabitacion();
        setTipoHabitacion(response.data);
      } catch (error) {
        console.error('Error al cargar los tipos de habitacion', error);
      }
    }

  const handleGuardarTipoHabitacion = async (tipohabitacion: TipoHabitacion) => {
    try {
      setLoading(true);
        
      // Validacion para ver si existe el id, si existe se actualiza, si no se crea uno nuevo
      if (tipohabitacion. idTipoHabitacion) {
        await updateTipoHabitacion(tipohabitacion. idTipoHabitacion, tipohabitacion);
      } else {
         await createTipoHabitacion(tipohabitacion);
      }
        
      await fetchTipoHabitacion();
        
      // Cerrar el modal
      setModalVisible(false);
        
    } catch (err) {
      setError("Error al guardar el Tipo Habitacion");
      console.error("Error guardando Tipo Habitacion:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
      setTipoHabitacionSeleccionado(null);  // Para crear un nuevo huésped, no se selecciona ninguno
      setModoEdicion(false);
      setModalVisible(true);
    };
    
    const handleEdit = (tipohabitacion: TipoHabitacion) => {
      setTipoHabitacionSeleccionado(tipohabitacion); // Se le pasa el tipo habitacion seleccionado al modal
      setModoEdicion(true); // Para indicar que estamos en modo edición
      setModalVisible(true);
    };
    
  
    const handleDelete = async(id: number) => {
      try {
        await deleteTipoHabitacion(id); // Llamada a la API para eliminar el huésped y se le pasa el id del registro
        fetchTipoHabitacion();
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

        {/* Tabla de Tipo habitacion */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Habitacion Id
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
              {tipohabitaciones.map((guest) => (
                <tr key={guest.idTipoHabitacion}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.idTipoHabitacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(guest)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest.idTipoHabitacion)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Mandamos a llamar al modal 
          y se le pasa la funcion para poder guardar ya sea edicion o guardar por primera vez */}
          {modalVisible && (
          <ModalTipoHabitacion
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            tipohabitacion={tipohabitacionSeleccionado}
            onGuardar={handleGuardarTipoHabitacion}
          />
        )}

        </div>
      </div>
    </div>
  );
}

export default TipoHabitacion;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}