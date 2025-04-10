import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, X } from 'lucide-react';
import { getDetallesReserva, createDetalleReserva, updateDetalleReserva, deleteDetalleReserva } from '../services/detalleReservaService';

interface ReservacionDetalle {
  idDetalleReserva?: number;
  id?: number;
  idReserva: string;
  idHabitacion: string;
  subTotal: string;
  cantidadNoches: string;
}

function ReservacionDetalles() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<ReservacionDetalle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ReservacionDetalle | null>(null);
  const [formData, setFormData] = useState<Omit<ReservacionDetalle, 'id'>>({
    idReserva: '',
    idHabitacion: '',
    subTotal: '',
    cantidadNoches: ''
  });

  // Fetch all reservation details on component mount
  useEffect(() => {
    fetchDetallesReserva();
  }, []);

  const fetchDetallesReserva = async () => {
    setIsLoading(true);
    try {
      const response = await getDetallesReserva();
      setDetails(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reservation details:', err);
      setError('Error al cargar los detalles de reserva. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      idReserva: '',
      idHabitacion: '',
      subTotal: '',
      cantidadNoches: ''
    });
    setSelectedDetail(null);
  };

  const handleOpenModal = (detail?: ReservacionDetalle) => {
    if (detail) {
      // Edit mode
      setSelectedDetail(detail);
      setFormData({
        idReserva: detail.idReserva,
        idHabitacion: detail.idHabitacion,
        subTotal: detail.subTotal,
        cantidadNoches: detail.cantidadNoches
      });
    } else {
      // Create mode
      resetForm();
    }
    setShowModal(true);
  };

  const handleCreate = () => {
    handleOpenModal();
  };

  const handleEdit = (id: number) => {
    const detailToEdit = details.find(detail => detail.id === id || detail.idDetalleReserva === id);
    if (detailToEdit) {
      handleOpenModal(detailToEdit);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro que desea eliminar este detalle de reserva?')) {
      try {
        await deleteDetalleReserva(id);
        // Refresh the list after deletion
        fetchDetallesReserva();
      } catch (err) {
        console.error('Error deleting reservation detail:', err);
        setError('Error al eliminar el detalle de reserva. Por favor, intente de nuevo.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedDetail) {
        // Update existing detail
        const idToUpdate = selectedDetail.idDetalleReserva || selectedDetail.id;
        if (idToUpdate) {
          await updateDetalleReserva(idToUpdate, formData);
        }
      } else {
        // Create new detail
        await createDetalleReserva(formData);
      }
      
      // Close modal and refresh the list
      setShowModal(false);
      resetForm();
      fetchDetallesReserva();
    } catch (err) {
      console.error('Error saving reservation detail:', err);
      setError('Error al guardar el detalle de reserva. Por favor, intente de nuevo.');
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
            <h1 className="text-2xl font-bold text-gray-900">Detalles de Reserva</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Detalle
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center">Cargando...</div>
          ) : details.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay detalles de reserva disponibles.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Reserva
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Habitación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SubTotal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad Noches
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {details.map((detail) => (
                  <tr key={detail.idDetalleReserva || detail.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{detail.idDetalleReserva || detail.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {detail.idReserva}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {detail.idHabitacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${detail.subTotal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {detail.cantidadNoches}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(detail.idDetalleReserva || detail.id!)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(detail.idDetalleReserva || detail.id!)}
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
      </div>

      {/* Modal para crear/editar detalles */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedDetail ? 'Editar Detalle de Reserva' : 'Nuevo Detalle de Reserva'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Reserva</label>
                <input
                  type="text"
                  name="idReserva"
                  value={formData.idReserva}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Habitación</label>
                <input
                  type="text"
                  name="idHabitacion"
                  value={formData.idHabitacion}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                <input
                  type="text"
                  name="subTotal"
                  value={formData.subTotal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad de Noches</label>
                <input
                  type="text"
                  name="cantidadNoches"
                  value={formData.cantidadNoches}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  {selectedDetail ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ReservacionDetalles;