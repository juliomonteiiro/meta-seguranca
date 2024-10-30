// src/routes/AppRoutes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Budget } from '../pages/budget/budget';
import { Services } from '../pages/services/services';
import { Home } from '../pages/home/home.page';
import About from '../pages/about/about-page';
import { Productbar } from '../pages/Product-bar/Product-bar';
import { Marketplace } from '../pages/marketplace/marketplace';
import { ProductPage } from '../pages/marketplace/ProductPage/ProductPage';
import { Registration } from '../pages/registration/registration.page';
import CartPage from '../pages/marketplace/CartPage/CartPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota para a versão "one-page" */}
      <Route path="/" element={<Navigate to="/meta-seguranca" />} />
      <Route path="/meta-seguranca" element={
        <div className="container">
          <Home />
          <Services />
          <Productbar />
          <About />
          <Marketplace />
          <Budget/>
        </div>
      } />

      {/* Rotas individuais para cada página */}
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Marketplace />} />
      <Route path="/contact" element={<Budget id="contato" />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/ProductPage" element={<ProductPage />} />
      <Route path="/Cart" element={<CartPage />} /> {/* Rota para CartPage */}
    </Routes>
  );
};

export default AppRoutes;
