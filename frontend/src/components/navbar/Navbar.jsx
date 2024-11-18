import React, { useEffect, useState } from 'react';
import metaseguranca from '../../assets/images/meta.png';
import { Button } from '../form/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, logout } = useAuth(); // Pegando o estado de login do contexto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Declaração do estado para abrir/fechar o menu
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navega para o perfil
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout
    navigate('/'); // Redireciona para a página inicial
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Função para alternar o estado do menu
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Apenas faz a requisição se o usuário estiver logado
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3001/api/user/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
          }

          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]); // Executa apenas se o estado de login mudar

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
          <Link to="/" className={styles.menu}>Início</Link>
          <Link to="/services" className={styles.menu}>Serviços</Link>
          <Link to="/about" className={styles.menu}>Sobre Nós</Link>
          <Link to="/products" className={styles.menu}>Produtos</Link>
          <Link to="/contact" className={styles.menu}>Contato</Link>

          <div className={styles.profileButtonContainer}>
            {isLoggedIn ? (
              <div>
                <img
                  src={userData?.foto_perfil_url || 'default-profile-pic.png'}
                  alt="Foto do Perfil"
                  className={styles.profileImage}
                  onClick={handleProfileClick}
                />
                <Button onClick={handleLogout} className={styles.botao}>Sair</Button>
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
