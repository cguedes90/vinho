import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/api';
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.error || 'Erro ao fazer login' 
            };
        }
    };

    const register = async (nome, email, password, tipoUsuario) => {
        try {
            const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/api';
            const response = await axios.post(`${API_URL}/auth/register`, {
                nome,
                email,
                password,
                tipoUsuario
            });
            
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.error || 'Erro ao fazer cadastro' 
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            isLojista: user?.tipo_usuario === 'lojista',
            isCliente: user?.tipo_usuario === 'cliente',
            isSuperAdmin: user?.tipo_usuario === 'super_admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};