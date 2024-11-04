import React, { useState } from 'react';
import metaseguranca from '../../assets/images/meta.png';
import { Button } from '../form/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Obtém o estado de login e a função de logout do contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Usar o valor anterior para evitar problemas de estado
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout
    navigate('/'); // Redireciona para a página inicial
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
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={styles.menu} onClick={handleLinkClick}>Perfil</Link>
                <Button onClick={handleLogout} className={styles.botao}>Sair</Button>
              </>
            ) : (
              <Link to="/registration">
                <Button className={styles.botao}>Crie seu perfil</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
