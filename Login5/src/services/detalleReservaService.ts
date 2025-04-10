
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/detalleReserva';

export const getDetallesReserva = () => axios.get(API_URL);
export const getDetalleReserva = (id: number) => axios.get(`${API_URL}/${id}`);
export const createDetalleReserva = (data: any) => axios.post(API_URL, data);
export const updateDetalleReserva = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteDetalleReserva = (id: number) => axios.delete(`${API_URL}/${id}`);