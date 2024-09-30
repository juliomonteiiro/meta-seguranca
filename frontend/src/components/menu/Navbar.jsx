import React from 'react'
import { useEffect, useState } from "react";
import './Navbar.css'
import metaseguranca from '../../assets/images/metaseguranca.png'
import {Button} from "../form/button";
import LoadingAnimation from "../loading-animation";

const Navbar = () => {

  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading ] = useState(true);

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
        <div className="navbar1">
    <Button href="">Login</Button>
    </div>
      <div className="navbar">
      
    <Button href="">Cadastra=se</Button>
    </div>
    </header>
  )
}

export default Navbar