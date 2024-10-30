// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import AppRoutes from './routes/AppRoutes'; // Importando o novo arquivo de rotas
import { CartProvider } from '../src/pages/marketplace/CartPage/CartContext/CartContext'; // Importando o contexto do carrinho

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
    <CartProvider> {/* Envolvendo a aplicação com o CartProvider */}
      <App />
    </CartProvider>
  </Router>
);

export default AppWrapper;
