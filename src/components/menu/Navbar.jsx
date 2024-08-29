import React from 'react'
import './Navbar.css'
import metaseguranca from '../../assets/images/metaseguranca.jpg'

const Navbar = () => {
  return (
    <header className="header">
      
      <nav className="navbar">
      <a href="/" className="logo"><img src={metaseguranca} alt="Logo" className="navbar-logo" /></a>

        <a href="/" className="menu">Ínicio</a>
        <a href="/" className="menu">Serviços</a>
        <a href="/" className="menu">Sobre Nós</a>
        <a href="/" className="menu">Produtos</a>
        <a href="/" className="menu">Contato</a>
        
      </nav>

    </header>
  )
}

export default Navbar