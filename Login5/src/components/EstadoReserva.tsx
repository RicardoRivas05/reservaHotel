import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import {getEstadoReserva, createEstadoReserva, updateEstadoReserva, deleteEstadoReserva } from '../services/estadoreservaService';
import { ModalEstadoReserva } from './ModalEstadoReserva';


interface EstadoReserva {
  idEstadoReserva: number;
  estado: string;
}

function EstadoReserva() {
  const navigate = useNavigate();
  const [estadoreservas, setEstadoReserva] = useState<EstadoReserva[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoreservaSeleccionado, setEstadoreservaSeleccionado] = useState<EstadoReserva | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    fetchEstadoreservas();
  }, []);

  const fetchEstadoreservas = async () => {
    try {
      const response = await getEstadoReserva();
      setEstadoReserva(response.data);
    } catch (error) {
      console.error('Error al cargar los huéspedes', error);
    }
  }

  const handleGuardarEstadoReserva = async (estadoreserva: EstadoReserva) => {
    try {
      setLoading(true);
      
      // Validacion para ver si existe el id, si existe se actualiza, si no se crea uno nuevo
      if (estadoreserva. idEstadoReserva) {
        await updateEstadoReserva(estadoreserva. idEstadoReserva, estadoreserva);
      } else {
        await createEstadoReserva(estadoreserva);
      }
      
      // Se llama a la funcion para obtener los Estadoreservas nuevamente y actualizar la tabla
      await fetchEstadoreservas();
      
      // Cerrar el modal
      setModalVisible(false);
      
    } catch (err) {
      setError("Error al guardar el huésped");
      console.error("Error guardando huésped:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEstadoreservaSeleccionado(null);  // Para crear un nuevo huésped, no se selecciona ninguno
    setModoEdicion(false);
    setModalVisible(true);
  };
  
  const handleEdit = (estadoreserva: EstadoReserva) => {
    setEstadoreservaSeleccionado(estadoreserva); // Se le pasa el estadoreserva seleccionado al modal
    setModoEdicion(true); // Para indicar que estamos en modo edición
    setModalVisible(true);
  };
  

  const handleDelete = async(id: number) => {
    try {
      await deleteEstadoReserva(id); // Llamada a la API para eliminar el huésped y se le pasa el id del registro
      fetchEstadoreservas();
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
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Huéspedes</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Huésped
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado Reserva Id
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
              {estadoreservas.map((guest) => (
                <tr key={guest. idEstadoReserva}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest. idEstadoReserva}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.estado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(guest)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest. idEstadoReserva)}
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
          <ModalEstadoReserva
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            estadoreserva={estadoreservaSeleccionado}
            onGuardar={handleGuardarEstadoReserva}
          />
        )}

        </div>
      </div>
    </div>
  );
}

export default EstadoReserva;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
