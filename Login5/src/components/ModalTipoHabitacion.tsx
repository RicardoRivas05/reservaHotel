import { useEffect, useState } from "react";
import TipoHabitacion from "./TipoHabitacion";

interface ModalTipoHabitacionProps {
  visible: boolean;
  onClose: () => void;
  tipohabitacion: TipoHabitacion | null;
  onGuardar: (datos: TipoHabitacion) => void;
}

export const ModalTipoHabitacion: React.FC<ModalTipoHabitacionProps> = ({ visible, onClose, tipohabitacion, onGuardar }) => {
  const [formData, setFormData] = useState<TipoHabitacion>(
    tipohabitacion || { idTipoHabitacion: 0, nombre: '' }
  );

  useEffect(() => {
    setFormData(tipohabitacion || { idTipoHabitacion: 0, nombre: '' }); // Actualiza el estado del formulario cuando cambia el tipo habitacion
  }, [tipohabitacion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Actualiza el estado del formulario
  };

  if (!visible) return null; // Si el modal no es visible, no renderiza nada

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>
          {tipohabitacion ? 'Editar Tipo Habitacion' : 'Nuevo Tipo Habitacion'}
        </h2>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre:</label>
            <input 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="Nombre" 
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