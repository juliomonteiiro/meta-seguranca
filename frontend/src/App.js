// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import AppRoutes from './routes/AppRoutes'; // Importando o novo arquivo de rotas

const App = () => {
  const location = useLocation();
  
  // Definir rotas onde o Navbar e Footer não devem aparecer
  const isRegistrationPage = location.pathname === '/registration';

  return (
    <div>
      {!isRegistrationPage && <Navbar />} {/* Ocultar Navbar na página de registro */}
      <AppRoutes />
      {!isRegistrationPage && <Footer />} {/* Ocultar Footer na página de registro */}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
