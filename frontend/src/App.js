import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Budget } from './pages/budget/budget';
import { Services } from './pages/services/services';
import Footer from './components/footer/footer';
import { Home } from './pages/home/home.page';
import About from './pages/about/about-page';
import { Productbar } from './pages/Product-bar/Product-bar';
import { Marketplace } from './pages/marketplace/marketplace';
import Navbar from './components/navbar/Navbar'
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div>
    <Router>
      <Navbar /> {/* Adicionando a Navbar aqui */}

      <Routes>
        {/* Rota para a versão "one-page" */}
        <Route path="/" element={<Navigate to="/meta-seguranca" />} />
  <Route path="/meta-seguranca" element={
    <>
      <Home />
      <Services />
      <Productbar />
      <About />
      <Marketplace />
      <Budget id="contato" />
    </>
  } />
        
        {/* Rotas individuais para cada página */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Marketplace />} />
        <Route path="/contact" element={<Budget id="contato" />} />
      </Routes>

      
    </Router>
    <Footer /></div>
  );
}

export default App;
