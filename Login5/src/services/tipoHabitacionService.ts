import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tipoHabitacion'; //Personalizar segun sea el caso

export const getTipoHabitacion = () => axios.get(API_URL);
export const createTipoHabitacion = (data: any) => axios.post(API_URL, data);
export const updateTipoHabitacion = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteTipoHabitacion = (id: number) => axios.delete(`${API_URL}/${id}`);