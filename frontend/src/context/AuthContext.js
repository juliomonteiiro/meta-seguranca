import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Recupera o estado de login do local storage ao iniciar
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    useEffect(() => {
        // Armazena o estado de login no local storage quando muda
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const login = (user) => {
        // Lógica para definir usuário como logado
        setIsLoggedIn(true);
        // Poderia armazenar informações do usuário, se necessário
    };

    const logout = () => {
        // Lógica para deslogar usuário
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // Remove do local storage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
