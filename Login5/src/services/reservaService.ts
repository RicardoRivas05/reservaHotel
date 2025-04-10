import axios from 'axios';

const API_URL = 'http://localhost:3000/api/reserva'; //Personalizar segun sea el caso

export const getReservas = () => axios.get(API_URL);
export const createReserva = (data: any) => axios.post(API_URL, data);
export const updateReserva = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteReserva = (id: number) => axios.delete(`${API_URL}/${id}`);
