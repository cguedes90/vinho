import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const wineService = {
    getAll: () => api.get('/vinhos'),
    search: (query) => api.get(`/vinhos/search?q=${encodeURIComponent(query)}`),
    getById: (id) => api.get(`/vinhos/${id}`),
    getRecommendations: (query) => api.get(`/recommend?q=${encodeURIComponent(query)}`),
    
    // Rotas para lojistas
    create: (wineData) => api.post('/vinhos', wineData),
    update: (id, wineData) => api.put(`/vinhos/${id}`, wineData),
    delete: (id) => api.delete(`/vinhos/${id}`),
    getMyWines: () => api.get('/lojista/vinhos'),
};

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (nome, email, password, tipoUsuario) => 
        api.post('/auth/register', { nome, email, password, tipoUsuario }),
};

export default api;