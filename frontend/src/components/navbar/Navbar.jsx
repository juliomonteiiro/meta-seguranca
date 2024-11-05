import React, { useEffect, useState } from 'react';
import metaseguranca from '../../assets/images/meta.png';
import { Button } from '../form/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn } = useAuth(); // Obtém o estado de login e a função de logout do contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Usar o valor anterior para evitar problemas de estado
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redireciona para a página de perfil
  };

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost/backend/getUserData.php', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const data = await response.json();

            if (data.data_nasc) {
                data.data_nasc = new Date(data.data_nasc).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            }

            setUserData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();
}, []);

if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

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
             <div className={styles.profileButtonContainer}>
             <img
               src={userData.foto_perfil_url || 'default-profile-pic.png'}
               alt="Foto do Perfil"
               className={styles.profileImage}
               onClick={handleProfileClick}
             />
           </div>
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
