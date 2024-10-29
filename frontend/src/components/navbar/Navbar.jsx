import React, { useState } from 'react';
import metaseguranca from '../../assets/images/meta.png';
import { Button } from '../form/button';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <img src={metaseguranca} alt="Meta Segurança Eletrônica" className={styles.logo} />
        </Link>

        <div className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        <div className={`${styles.menuItems} ${isMenuOpen ? styles.open : ''}`}>
          <Link to="/" className={styles.menu} onClick={handleLinkClick}>Início</Link>
          <Link to="/services" className={styles.menu} onClick={handleLinkClick}>Serviços</Link>
          <Link to="/about" className={styles.menu} onClick={handleLinkClick}>Sobre Nós</Link>
          <Link to="/products" className={styles.menu} onClick={handleLinkClick}>Produtos</Link>
          <Link to="/contact" className={styles.menu} onClick={handleLinkClick}>Contato</Link>
          <div className={styles.profileButtonContainer}>
          <Link to="/registration"><Button className={styles.botao}>Crie seu perfil</Button></Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
