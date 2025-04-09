import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { getHuespedes, createHuesped, updateHuesped, deleteHuesped } from '../services/huespedService';
import { ModalHuesped } from './ModalHuesped';


interface Huesped {
  idHuesped: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  correoElectronico: string;
}

function Huesped() {
  const navigate = useNavigate();
  const [huespedes, setHuespedes] = useState<Huesped[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [huespedSeleccionado, setHuespedSeleccionado] = useState<Huesped | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    fetchHuespedes();
  }, []);

  const fetchHuespedes = async () => {
    try {
      const response = await getHuespedes();
      setHuespedes(response.data);
    } catch (error) {
      console.error('Error al cargar los huéspedes', error);
    }
  }

  const handleGuardarHuesped = async (huesped: Huesped) => {
    try {
      setLoading(true);
      
      // Validacion para ver si existe el id, si existe se actualiza, si no se crea uno nuevo
      if (huesped.idHuesped) {
        await updateHuesped(huesped.idHuesped, huesped);
      } else {
        await createHuesped(huesped);
      }
      
      // Se llama a la funcion para obtener los huespedes nuevamente y actualizar la tabla
      await fetchHuespedes();
      
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
    setHuespedSeleccionado(null);  // Para crear un nuevo huésped, no se selecciona ninguno
    setModoEdicion(false);
    setModalVisible(true);
  };
  
  const handleEdit = (huesped: Huesped) => {
    setHuespedSeleccionado(huesped); // Se le pasa el huesped seleccionado al modal
    setModoEdicion(true); // Para indicar que estamos en modo edición
    setModalVisible(true);
  };
  

  const handleDelete = async(id: number) => {
    try {
      await deleteHuesped(id); // Llamada a la API para eliminar el huésped y se le pasa el id del registro
      fetchHuespedes();
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
                  Huesped Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apellido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Direccion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo Electronico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {huespedes.map((guest) => (
                <tr key={guest.idHuesped}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.idHuesped}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.apellido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.direccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guest.correoElectronico}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(guest)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest.idHuesped)}
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
          <ModalHuesped
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            huesped={huespedSeleccionado}
            onGuardar={handleGuardarHuesped}
          />
        )}

        </div>
      </div>
    </div>
  );
}

export default Huesped;

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
