import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? !isTokenExpired(token) : false; // Verifica se o token existe e não está expirado
  });

  useEffect(() => {
    // Atualiza o estado de login ao mudar
    if (isLoggedIn) {
      localStorage.setItem('token', localStorage.getItem('token'));
    } else {
      localStorage.removeItem('token');
    }
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  // Função para verificar a expiração do token
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
      const expiry = decoded.exp * 1000; // Expiração em milissegundos
      return expiry < Date.now(); // Se a expiração for menor que o tempo atual, está expirado
    } catch (e) {
      return true; // Se não conseguir decodificar, considera como expirado
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
