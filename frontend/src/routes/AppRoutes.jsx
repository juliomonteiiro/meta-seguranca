import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Budget } from '../pages/budget/budget';
import { Services } from '../pages/services/services';
import { Home } from '../pages/home/home.page';
import About from '../pages/about/about-page';
import { Productbar } from '../pages/Product-bar/Product-bar';
import { Marketplace } from '../pages/Marketplace/Marketplace';
import { ProductPage } from '../pages/Marketplace/ProductPage/ProductPage';
import { Registration } from '../pages/registration/registration.page';

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
    </Routes>
  );
};

export default AppRoutes;
