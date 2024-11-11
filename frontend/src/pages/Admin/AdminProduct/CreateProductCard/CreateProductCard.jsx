import React, { useState } from "react";
import { Button } from "../../../../components/form/button";
import { InputText } from "../../../../components/form/input";
import { TextArea } from "../../../../components/form/text-area";
import styles from './CreateProductCard.module.css';

export function CreateProductCard({ onCreateProduct, onCloseCard }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);

  const categoriasPermitidas = ["Tag", "Chaveiro", "Eletrônicos"];

  // Função para tratar mudanças no arquivo de imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagem(file);
    } else {
      alert("Por favor, selecione uma imagem válida.");
      setImagem(null);
    }
  };

  // Função para enviar o formulário de criação de produto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!nome || !descricao || !preco || !categoria || !imagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!categoriasPermitidas.includes(categoria)) {
      alert("Categoria inválida. As categorias permitidas são: Tag, Chaveiro, Eletrônicos.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("categoria", categoria);
    formData.append("imagem", imagem);

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        onCreateProduct(data); // Atualiza a lista de produtos com o novo produto
        onCloseCard(); // Fecha o card de criação
      } else {
        alert("Erro ao salvar produto: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2>Adicionar Produto</h2>
        <button className={styles.closeButton} onClick={onCloseCard}>X</button>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
        <div className={styles.formGroup}>
          <InputText
            type="text"
            name="nome"
            placeholder="Nome do Produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <InputText
            type="number"
            name="preco"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <TextArea
            name="descricao"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categoriasPermitidas.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imagem">Imagem:</label>
          <input
            type="file"
            id="imagem"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <Button type="submit" className={styles.addButton}>
          Adicionar Produto
        </Button>
      </form>
    </div>
  );
}

export default CreateProductCard;
