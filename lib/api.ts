import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000',
    withCredentials: true, // This sends HttpOnly cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cookie helper function
const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
};

// Token management functions
export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        // First try to get from cookie
        const cookieToken = getCookie('access_token');
        if (cookieToken) {
            return cookieToken;
        }
        
        // Fallback to localStorage/sessionStorage
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
    return null;
};

export const setAuthToken = (token: string, remember: boolean = false): void => {
    if (typeof window !== 'undefined') {
        if (remember || token === ' ') {
            localStorage.setItem('authToken', token);
            sessionStorage.removeItem('authToken');
        } else {
            sessionStorage.setItem('authToken', token);
            localStorage.removeItem('authToken');
        }
    }
};

export const removeAuthToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
    }
};

// Request interceptor to add Bearer token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        console.log('Interceptor - Token encontrado:', token ? 'Sim' : 'Não');
        console.log('Interceptor - Token valor:', token);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Interceptor - Header Authorization definido');
        } else {
            console.log('Interceptor - Nenhum token encontrado');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Remove invalid token and redirect to login
            removeAuthToken();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
