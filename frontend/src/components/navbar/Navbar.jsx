import React from 'react';
import './Navbar.css';
import metaseguranca from '../../assets/images/metaseguranca.png';
import { Button } from "../form/button";
import { Link } from 'react-router-dom'; // Importando Link do React Router

const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={metaseguranca} alt="Meta Segurança Eletrônica" className="navbar-logo" />
        </Link>
        <Link to="/" className="menu">Início</Link>
        <Link to="/services" className="menu">Serviços</Link>
        <Link to="/about" className="menu">Sobre Nós</Link>
        <Link to="/products" className="menu">Produtos</Link>
        <Link to="/contact" className="menu">Contato</Link>
      </nav>
      <Button href="/">Crie seu perfil</Button>
    </header>
  );
};

export default Navbar;

