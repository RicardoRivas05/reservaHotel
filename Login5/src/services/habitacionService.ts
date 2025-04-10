import axios from "axios";

const API_URL = "http://localhost:3001/api/habitacion"; //Personalizar segun sea el caso

export const getHabitacion = () => axios.get(API_URL);
export const createHabitacion = (data: any) => axios.post(API_URL, data);
export const updateHabitacion = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteHabitacion = (id: number) => axios.delete(`${API_URL}/${id}`);