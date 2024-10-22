import React, { useState } from 'react';
import metaseguranca from '../../assets/images/metaseguranca.png';
import { Button } from '../form/button';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={metaseguranca} alt="Meta Segurança Eletrônica" className="navbar-logo" />
        </Link>

        {/* Menu Toggle para dispositivos móveis */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Links do Menu */}
        <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="menu">Início</Link>
          <Link to="/services" className="menu">Serviços</Link>
          <Link to="/about" className="menu">Sobre Nós</Link>
          <Link to="/products" className="menu">Produtos</Link>
          <Link to="/contact" className="menu">Contato</Link>
        </div>
      </nav>

      {/* Botão no topo */}
      <div className="profile-button-container">
        <Button className="botao" href="/registration"><Link to="/registration">Crie seu perfil</Link></Button>
      </div>
    </header>
  );
};

export default Navbar;
