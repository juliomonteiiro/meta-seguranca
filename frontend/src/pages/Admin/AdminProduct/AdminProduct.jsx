import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/form/button';
import { CreateProductCard } from './CreateProductCard/CreateProductCard'; // Certifique-se de que o caminho do CreateProductCard está correto
import styles from './AdminProduct.module.css';
import { InputText } from '../../../components/form/input';

const categoriasPermitidas = ["Tag", "Chaveiro", "Eletrônicos"];

export function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null); // Produto a ser editado
  const [editedProduct, setEditedProduct] = useState(null); // Dados do produto editado
  const [showCreateCard, setShowCreateCard] = useState(false); // Controle para mostrar o card de criação

  // Carregar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Erro ao carregar os produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Função para iniciar a edição de um produto
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({
      id: product.id,
      nome: product.title,    // 'title' do produto
      descricao: product.infos, // 'infos' do produto
      preco: product.price,    // 'price' do produto
      categoria: product.category, // 'category' do produto
      imagem: '',  // O campo imagem pode começar vazio se for para atualizar
    });
  };

  // Função para salvar a edição do produto
  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('nome', editedProduct.nome);
      formData.append('descricao', editedProduct.descricao);
      formData.append('preco', editedProduct.preco);
      formData.append('categoria', editedProduct.categoria);
      if (editedProduct.imagem) formData.append('imagem', editedProduct.imagem); // imagem editável

      const response = await fetch(`http://localhost:3001/api/products/${editedProduct.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao editar produto');
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setEditingProductId(null);
      setEditedProduct(null);
    } catch (error) {
      console.error('Erro ao editar produto: ', error);
    }
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct(null);
  };

  // Função para alterar os dados do produto editado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,  // Atualizando o campo correto baseado no nome
    }));
  };

  // Função para excluir produto
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir produto');
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Erro ao excluir produto: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Produtos</h1>

      <Button className={styles.addProductButton} onClick={() => setShowCreateCard(true)}>
        Adicionar Produto
      </Button>

      {/* Mostrar o card de criação de produto quando showCreateCard for true */}
      {showCreateCard && (
        <CreateProductCard
          onCloseCard={() => setShowCreateCard(false)} // Fecha o card de criação
          onCreateProduct={(newProduct) => {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setShowCreateCard(false);
          }} 
        />
      )}

      {/* Exibe a tabela de produtos */}
      {loading ? (
        <div>Carregando produtos...</div>
      ) : (
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(e)}
                      name="imagem"
                      accept="image/*"
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <InputText
                      type="text"
                      name="nome"
                      value={editedProduct.nome}  // Corrigido para 'nome'
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <InputText
                      type="number"
                      name="preco"
                      value={editedProduct.preco}  // Corrigido para 'preco'
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <select
                      name="categoria"
                      className={styles.SelectCategory}
                      value={editedProduct.categoria}  // Corrigido para 'categoria'
                      onChange={handleInputChange}
                    >
                      {categoriasPermitidas.map((categoria, index) => (
                        <option key={index} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.category  // Corrigido para 'category'
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <>
                      <button onClick={handleSaveEdit}>Salvar</button>
                      <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditProduct(product)}>Editar</button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProduct;
