import axios from 'axios';


const API_URL = 'http://localhost:3000/api/estadoHabitacion'; //Personalizar segun sea el caso

export const getEstadoHabitacion = () => axios.get(API_URL);
export const createEstadoHabitacion = (data: any) => axios.post(API_URL, data);
export const updateEstadoHabitacion = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteEstadoHabitacion = (id: number) => axios.delete(`${API_URL}/${id}`);
