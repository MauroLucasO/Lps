import axios from 'axios';

export const BASE_URL = 'http://localhost:8081/api/v1';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
    (config) => {
        // Antes de qualquer requisição sair, ele busca o token no localStorage
        const token = localStorage.getItem('meu_token');

        // Se o token existir, ele injeta no cabeçalho
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;