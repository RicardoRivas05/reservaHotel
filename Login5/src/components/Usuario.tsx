import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';

interface Usuario {
  id: number;
  password: string;
}

function Usuarios() {
  const navigate = useNavigate();
  const [rooms, setusuarios] = useState<Usuario[]>([
    {
      id: 1,
      password: '1234',
    }
  ]);

  // Estado para el modal/formulario
  const [showModal, setShowModal] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Omit<Usuario, 'id'>>({
    password: '',
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal para crear nueva habitación
  const handleCreate = () => {
    setCurrentUsuario(null);
    setFormData({
        password: '',
    });
    setShowModal(true);
  };

  // Guardar nueva habitación o actualizar existente
  const handleSave = () => {
    if (currentUsuario) {
      // Actualizar habitación existente
      setusuarios(rooms.map(room => 
        room.id === currentUsuario.id ? { ...formData, id: currentUsuario.id } : room
      ));
    } else {
      // Crear nueva habitación
      const newRoom: Usuario = {
        ...formData,
        id: Math.max(0, ...rooms.map(r => r.id)) + 1,
      };
      setusuarios([...rooms, newRoom]);
    }
    setShowModal(false);
  };

  // Editar habitación existente
  const handleEdit = (id: number) => {
    const usuarioToEdit = rooms.find(room => room.id === id);
    if (usuarioToEdit) {
      setCurrentUsuario(usuarioToEdit);
      setFormData({
        password: usuarioToEdit.password,
      });
      setShowModal(true);
    }
  };

  // Eliminar habitación
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      setusuarios(rooms.filter(room => room.id !== id));
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
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Usuario
          </button>
        </div>

        {/* Modal para crear/editar */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {currentUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
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
                  {currentUsuario ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Usuarios */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Password
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.password}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(room.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
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

export default Usuarios;