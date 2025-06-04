import axios from 'axios';
import AuthService from "../src/service/authService.js"; // ✅ Fix the path + extension

const API_BASE_URL = 'http://localhost:9192/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const isPublicEndpoint =
            config.url.includes('/auth/login') || config.url.includes('/auth/register');

        if (!isPublicEndpoint) {
            const token = AuthService.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            AuthService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
