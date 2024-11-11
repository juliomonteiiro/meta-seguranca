import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.css"; 
import { InputText } from "../../../components/form/input";
import { Button } from "../../../components/form/button";
import { TextArea } from "../../../components/form/text-area";

export function AddProduct() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  const categoriasPermitidas = ["Tag", "Chaveiro", "Eletrônicos"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagem(file);
    } else {
      alert("Por favor, selecione uma imagem válida.");
      setImagem(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch('http://localhost:3001/api/create_product', {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        navigate("/products");
      } else {
        alert("Erro ao adicionar produto: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto.");
    }
  };

    return (
      <div className={styles.AddProductContainer}>
        <h1>Adicionar Produto</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <div className={styles.formGroup}>
            <TextArea
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
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
          <Button className={styles.addButton} type="submit">Adicionar Produto</Button>
        </form>
      </div>
    );
  }

export default AddProduct;
