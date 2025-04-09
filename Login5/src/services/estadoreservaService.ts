import axios from 'axios';


const API_URL = 'http://localhost:3001/api/estadoreserva'; //Personalizar segun sea el caso

export const getEstadoReserva = () => axios.get(API_URL);
export const createEstadoReserva = (data: any) => axios.post(API_URL, data);
export const updateEstadoReserva = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteEstadoReserva = (id: number) => axios.delete(`${API_URL}/${id}`);
