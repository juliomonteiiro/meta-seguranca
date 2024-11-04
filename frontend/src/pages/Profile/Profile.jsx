import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                // Formata data de nascimento para o padrão brasileiro
                if (data.data_nasc) {
                    data.data_nasc = new Date(data.data_nasc)
                        .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
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

    // Função para formatar o CPF no padrão xxx.xxx.xxx-xx
    const formatCPF = (cpf) => {
        return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    };

    // Função para formatar o número de telefone no padrão (xx)xxxxx-xxxx
    const formatPhone = (phone) => {
        return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;


    return (
        <div className={styles.profile}>
            <div className={styles.profileContainer}>
                <h1 className={styles.titleprofile}>Perfil do Usuário</h1>
                {userData ? (
                    <>
                        <img
                            src={userData.foto || 'default-profile-pic.png'}
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
                    </>
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
