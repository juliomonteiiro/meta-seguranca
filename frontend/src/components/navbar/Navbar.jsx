// src/components/Navbar.jsx

import React, { useState } from 'react';
import './Navbar.css';
import metaseguranca from '../../assets/images/metaseguranca.png';
import { Button } from '../form/button';
import { Link } from 'react-router-dom'; // Importando Link do React Router

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={metaseguranca} alt="Meta Segurança Eletrônica" className="navbar-logo" />
        </Link>

        <div className="menu-toggle" onClick={toggleMenu}> {/* Botão de menu hambúrguer */}
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}> {/* Classe condicional para os itens do menu */}
          <Link to="/" className="menu">Início</Link>
          <Link to="/services" className="menu">Serviços</Link>
          <Link to="/about" className="menu">Sobre Nós</Link>
          <Link to="/products" className="menu">Produtos</Link>
          <Link to="/contact" className="menu">Contato</Link>
        </div>
      </nav>
      <Button href="/">Crie seu perfil</Button>
    </header>
  );
};

export default Navbar;

