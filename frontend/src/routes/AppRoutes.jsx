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
import { Login } from '../pages/login/login.page';
import { ForgotPassword } from '../pages/forgot-password/forgot-password.page';
import { RedefinePassword } from '../pages/redefine-password/redefine-password.page';


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
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/redefine-password/" element={<RedefinePassword />} />
      <Route path="/product-page" element={<ProductPage />} />
    </Routes>
  );
};

export default AppRoutes;
