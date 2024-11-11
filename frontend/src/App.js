import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import { CartProvider } from './pages/marketplace/CartPage/CartContext/CartContext';

import { AuthProvider } from './context/AuthContext'; 
import AppRoutes from './routes/AppRoutes'; 


const App = () => {
  const location = useLocation();


  const hideNavbarFooterPaths = [
    '/registration',
    '/login',
    '/forgot-password',
    '/profile',
    '/addproduct',
    '/admin-product',
    '/redefine-password/:email' // Use a pattern to match the token in the URL
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some(path => 
    location.pathname.match(new RegExp(`^${path.replace(/:\w+/, '\\w+')}$`))
  );


  return (
    <div>
      <AuthProvider>
      {!shouldHideNavbarFooter && <Navbar />} {/* Hide Navbar on specific pages */}
      <CartProvider>
      <AppRoutes />
      </CartProvider>
      {!shouldHideNavbarFooter && <Footer />} {/* Hide Footer on specific pages */}
      </AuthProvider>
    </div>
  );
};


export default App; // Removido o AppWrapper e a instância de Router

