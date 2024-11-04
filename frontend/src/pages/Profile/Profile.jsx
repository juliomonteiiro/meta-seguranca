// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false); // Estado para controle de upload

  // Simulando verificação de login
  const isLoggedIn = true; // Substitua pela sua lógica real

  useEffect(() => {
    if (isLoggedIn) {
      // Aqui você deve fazer uma requisição para buscar os dados do usuário
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost/backend/getUserData.php');
  
      // Verifica se a resposta é JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        setUserData(data);
      } else {
        const text = await response.text(); // Obtém o corpo da resposta como texto
        console.error('Esperava JSON, mas obtive:', text); // Loga a resposta
        throw new Error('Resposta não é JSON');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Configura a pré-visualização da imagem
      setImagePreview(URL.createObjectURL(file));
      setUploading(true); // Inicia o estado de upload

      const formData = new FormData();
      formData.append('foto', file);
      formData.append('email', userData.email); // Adapte conforme necessário

      try {
        const uploadResponse = await fetch('http://localhost/backend//uploadPhoto.php', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Erro ao fazer upload da imagem');
        }

        const result = await uploadResponse.json();
        console.log(result);
        // Aqui você pode atualizar o estado do usuário com a nova foto, se necessário
        setUploading(false); // Finaliza o estado de upload

      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        setUploading(false); // Finaliza o estado de upload mesmo se ocorrer um erro
      }
    }
  };

  if (!isLoggedIn) {
    return <div>Você precisa estar logado para acessar esta página.</div>;
  }

  return (
    <div>
      {userData && (
        <div>
          <h1>Perfil de {userData.nome}</h1>
          <img
            src={imagePreview || userData.foto_perfil}
            alt="Foto de perfil"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Adiciona estilo à imagem
          />
          <input
            type="file"
            accept="image/*" // Aceita apenas arquivos de imagem
            onChange={handleImageUpload}
            style={{ marginTop: '10px' }}
          />
          {uploading && <p>Fazendo upload da imagem...</p>} {/* Exibe mensagem de upload */}
          <h2>Dados do Usuário</h2>
          <p>Email: {userData.email}</p>
          {/* Adicione outros dados do usuário conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default Profile;
