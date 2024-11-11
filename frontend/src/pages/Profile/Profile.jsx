import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/form/button';
import { InputText } from '../../components/form/input';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
    const [formData, setFormData] = useState({
        user: '',
        phone: '',
        profileImage: null,
    });
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

                // Preenche os campos do formulário com os dados recebidos
                setUserData(data);
                setFormData({
                    user: data.nome,
                    phone: data.telefone,
                    profileImage: null,  // Não carregamos a imagem aqui, pois o usuário pode selecionar uma nova
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            profileImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('userId', userData.id);  // ID do usuário
        formDataToSend.append('user', formData.user);
        formDataToSend.append('phone', formData.phone);

        if (formData.profileImage) {
            formDataToSend.append('profileImage', formData.profileImage);
        }

        try {
            const response = await fetch('http://localhost/backend/editProfile.php', {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            });

            const result = await response.json();
            if (result.result === 'Perfil atualizado com sucesso!') {
                alert('Perfil atualizado com sucesso!');
                setIsEditing(false);  // Desabilita o modo de edição
                setUserData({ ...userData, nome: formData.user, telefone: formData.phone }); // Atualiza o estado local
            } else {
                alert('Erro ao atualizar perfil: ' + result.result);
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

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

                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Nome:</label>
                                    <InputText
                                        type="text"
                                        name="user"
                                        value={formData.user}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Telefone:</label>
                                    <InputText
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Imagem de Perfil:</label>
                                    <input
                                        type="file"
                                        name="profileImage"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div>
                                    <Button type="submit" className={styles.editButton}>Salvar Alterações</Button>
                                    <Button type="button" onClick={() => setIsEditing(false)} className={styles.editButton}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <>
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
                                    <Button onClick={() => setIsEditing(true)} className={styles.logoutButton}>
                                        Editar Perfil
                                    </Button>
                                </div>
                            </>
                        )}

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
