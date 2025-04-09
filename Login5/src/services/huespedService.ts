import axios from 'axios';


const API_URL = 'http://localhost:3000/api/huesped'; //Personalizar segun sea el caso

export const getHuespedes = () => axios.get(API_URL);
export const createHuesped = (data: any) => axios.post(API_URL, data);
export const updateHuesped = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteHuesped = (id: number) => axios.delete(`${API_URL}/${id}`);
