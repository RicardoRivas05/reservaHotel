import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { getReservas, createReserva, updateReserva, deleteReserva } from '../services/reservaService';
import { ModalReserva } from './ModalReserva';

interface Reserva {
  idReserva: number;
  idEstadoReserva: number;
  fechaCheckIn: string;
  fechaCheckOut: string;
  userId: number;
  idHuesped: number;
  total: number;
}

function Reserva() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    fetchReservas();
  }, []);
  
  const fetchReservas = async () => {
    try {
      const response = await getReservas();
      setReservas(response.data);
    } catch (error) {
      console.error('Error al cargar las Reservas', error);
    }
  }
  
  const handleGuardarReserva = async (reserva: Reserva) => {
    try {
      setLoading(true);
        
        // Validacion para ver si existe el id, si existe se actualiza, si no se crea uno nuevo
      if (reserva.idReserva) {
        await updateReserva(reserva.idReserva, reserva);
      } else {
        await createReserva(reserva);
      }
        
        // Se llama a la funcion para obtener las reservas nuevamente y actualizar la tabla
      await fetchReservas();
        
        // Cerrar el modal
      setModalVisible(false);
        
    } catch (err) {
      setError("Error al guardar la reserva");
      console.error("Error guardando reserva:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setReservaSeleccionada(null); 
    setModoEdicion(false);
    setModalVisible(true);
  };

  const handleEdit = (reserva: Reserva) => {
    setReservaSeleccionada(reserva); 
    setModoEdicion(true); 
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReserva(id); // Llamada a la API para eliminar la reserva y se le pasa el id del registro
      fetchReservas();
    } catch (error) {
      console.error('Error al eliminar reserva', error);
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
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nueva Reserva
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id reserva
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id estado reserva
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  fechaCheckIn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  fechaCheckOut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  user id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id huesped
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservas.map((reservation) => (
                <tr key={reservation.idReserva}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.idReserva}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.idEstadoReserva}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.fechaCheckIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.fechaCheckOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {reservation.userId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.idHuesped}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(reservation)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.idReserva)}
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
          <ModalReserva
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          reserva={reservaSeleccionada}
          onGuardar={handleGuardarReserva}
          />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reserva;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
