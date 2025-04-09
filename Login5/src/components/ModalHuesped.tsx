import { useEffect, useState } from "react";
import Huesped from "./Huesped";

interface ModalHuespedProps {
  visible: boolean;
  onClose: () => void;
  huesped: Huesped | null;
  onGuardar: (datos: Huesped) => void;
}

export const ModalHuesped: React.FC<ModalHuespedProps> = ({ visible, onClose, huesped, onGuardar }) => {
  const [formData, setFormData] = useState<Huesped>(
    huesped || { idHuesped: 0, nombre: '', apellido: '', direccion: '', telefono: '', correoElectronico: '' }
  );

  useEffect(() => {
    setFormData(huesped || { idHuesped: 0, nombre: '', apellido: '', direccion: '', telefono: '', correoElectronico: '' }); // Actualiza el estado del formulario cuando cambia el huesped
  }, [huesped]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Actualiza el estado del formulario
  };

  if (!visible) return null; // Si el modal no es visible, no renderiza nada

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>
          {huesped ? 'Editar Huésped' : 'Nuevo Huésped'}
        </h2>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre</label>
            <input 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Nombre" 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellido</label>
            <input 
              name="apellido" 
              value={formData.apellido} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Apellido" 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Dirección</label>
            <input 
              name="direccion" 
              value={formData.direccion} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Dirección" 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono</label>
            <input 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Teléfono" 
              type="tel"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input 
              name="correoElectronico" 
              value={formData.correoElectronico} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Correo Electrónico" 
              type="email"
            />
          </div>
        </div>

        <div style={styles.buttons}>
          <button onClick={onClose} style={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={() => onGuardar(formData)} style={styles.saveButton}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos definidos como objeto para facilitar su reutilización
const styles = {
  backdrop: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    width: '450px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '24px',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '22px',
    fontWeight: 600,
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '15px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
    '&:focus': {
      borderColor: '#0077cc',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    color: '#333',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  saveButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0077cc',
    color: 'white',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#0066b3',
    },
  },
};