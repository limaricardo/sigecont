import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7123";

export const client = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    withCredentials: true
});
