import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/form/button';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Realiza o logout
        navigate('/'); // Redireciona para o início
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

    const formatCPF = (cpf) => {
        return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    };

    const formatPhone = (phone) => {
        return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className={styles.profile}>
             <Link to="/" className={styles.backLink}>
          &larr; Voltar ao Início
        </Link>
            <div className={styles.profileContainer}>
                <h1 className={styles.titleprofile}>Perfil do Usuário</h1>
                {userData ? (
                    <>
                        <img
                            src={userData.foto_perfil_url || 'default-profile-pic.png'}
                            alt="Foto do perfil"
                            className={styles.profilePhoto}
                        />
                        <div className={styles.profileInfo}>
                            <div className={styles.column}>
                                <span className={styles.infoLabel}>Nome:</span>
                                <p className={styles.infoCard}>{userData.nome}</p>
                                
                                <span className={styles.infoLabel}>Email:</span>
                                <p className={styles.infoCard}>{userData.email}</p>
                                
                                <span className={styles.infoLabel}>Telefone:</span>
                                <p className={styles.infoCard}>
                                    {userData.telefone ? formatPhone(userData.telefone) : ''}
                                </p>
                            </div>
                            <div className={styles.column}>
                                <span className={styles.infoLabel}>Data de Nascimento:</span>
                                <p className={styles.infoCard}>{userData.data_nasc}</p>
                                <span className={styles.infoLabel}>CPF:</span>
                                <p className={styles.infoCard}>
                                    {userData.cpf ? formatCPF(userData.cpf) : ''}
                                </p>
                            </div>
                        </div> 
                        <div className={styles.actions}>
                        <Button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </Button>
                    </div>
                    </>
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
