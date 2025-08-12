import axios from 'axios';

const api = 'https://localhost:7006/api';


export const registerUser = (userData) => axios.post(`${api}/Users/Register`, userData);

export const loginUser = (userdata) => axios.post(`${api}/Users/Login`, userdata);