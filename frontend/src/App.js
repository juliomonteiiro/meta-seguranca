// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import AppRoutes from './routes/AppRoutes'; // Importing the routes

const App = () => {
  const location = useLocation();

  // Define routes where the Navbar and Footer should not appear
  const hideNavbarFooterPaths = [
    '/registration',
    '/login',
    '/forgot-password',
    '/redefine-password/:token' // Use a pattern to match the token in the URL
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some(path => 
    location.pathname.match(new RegExp(`^${path.replace(/:\w+/, '\\w+')}$`))
  );

  return (
    <div>
      {!shouldHideNavbarFooter && <Navbar />} {/* Hide Navbar on specific pages */}
      <AppRoutes />
      {!shouldHideNavbarFooter && <Footer />} {/* Hide Footer on specific pages */}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
