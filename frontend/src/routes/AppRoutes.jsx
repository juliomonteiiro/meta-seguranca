import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Budget } from '../pages/budget/budget';
import { Services } from '../pages/services/services';
import { Home } from '../pages/home/home.page';
import About from '../pages/about/about.page';
import { Productbar } from '../pages/Product-bar/Product-bar';
import { Marketplace } from '../pages/marketplace/marketplace';
import { ProductPage } from '../pages/marketplace/ProductPage/ProductPage';
import { Registration } from '../pages/User/Registration/registration.page';
import CartPage from '../pages/marketplace/CartPage/CartPage';
import { Login } from '../pages/User/Login/login.page';
import { ForgotPassword } from '../pages/User/forgot-password/forgot-password.page';
import { RedefinePassword } from '../pages/User/Redefine-Password/redefine-password.page';
import Profile from '../pages/User/Profile/Profile';
import { useAuth } from '../context/AuthContext';
import AdminProduct from '../pages/Admin/AdminProduct/AdminProduct';


const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/meta-seguranca" />} />
      <Route path="/meta-seguranca" element={
        <div className="container">
          <Home />
          <Services />
          <Productbar />
          <About />
          <Marketplace />
          <Budget />
        </div>
      } />

      
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Marketplace />} />
      <Route path="/contact" element={<Budget id="contato" />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/redefine-password/:email" element={<RedefinePassword />} />
      <Route path="/ProductPage" element={<ProductPage />} />
      

      <Route 
        path="/profile" 
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/admin-product" 
        element={isLoggedIn ? <AdminProduct /> : <Navigate to="/login" />} 
      />


    </Routes>
  );
};

export default AppRoutes;
