import React, { useState } from 'react';
import { Hotel } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-teal-100 p-4 rounded-full mb-4">
            <Hotel className="w-12 h-12 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-teal-600 font-medium">Ingrese a su cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-teal-600 hover:to-emerald-700 transition duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;