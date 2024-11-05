import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import { AuthProvider } from './context/AuthContext'; 
import AppRoutes from './routes/AppRoutes'; // Importando as rotas

const App = () => {
  const location = useLocation();

  // Define routes where the Navbar and Footer should not appear
  const hideNavbarFooterPaths = [
    '/registration',
    '/login',
    '/forgot-password',
    '/profile',
    '/redefine-password/:token' // Use a pattern to match the token in the URL
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some(path => 
    location.pathname.match(new RegExp(`^${path.replace(/:\w+/, '\\w+')}$`))
  );

  return (
    <div>
      <AuthProvider>
      {!shouldHideNavbarFooter && <Navbar />} {/* Hide Navbar on specific pages */}
      <AppRoutes />
      {!shouldHideNavbarFooter && <Footer />} {/* Hide Footer on specific pages */}
      </AuthProvider>
    </div>
  );
};

export default App; // Removido o AppWrapper e a instância de Router
