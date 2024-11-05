import React, { useEffect, useState } from "react";
import './marketplace.css';
import { Header } from "./header/header";
import { ProductList } from "./product/product";
import { useNavigate } from "react-router-dom";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Novo estado para controlar o loading

  const navigate = useNavigate();

  // Carregar os produtos da API quando o componente for montado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products'); // Requisição para a API
        if (!response.ok) {
          throw new Error("Erro ao carregar os produtos.");
        }
        const data = await response.json();
        setProducts(data); // Armazena os produtos na variável de estado
      } catch (error) {
        console.error("Erro ao buscar os produtos: ", error);
      } finally {
        setLoading(false);  // Finaliza o carregamento
      }
    };

    fetchProducts();  // Chama a função de fetch quando o componente for montado
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Tag", "Chaveiro", "Eletrônicos"];
  const filteredCategories = categories.filter(category => 
    category && category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowCategories(windowWidth > 1000);
  }, [windowWidth]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    navigate(product.link, { state: { product } });
  };

  return (
    <div className="Marketplace-Container">
      <Header setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} />
      <div className="Marketplace-Content">
        {showCategories && (
          <ul className="Category-Filters-Marketplace">
            <p>Categorias</p>
            {filteredCategories.map((category) => (
              <li key={category} onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        )}
        {/* Se estiver carregando, exibe uma mensagem de loading */}
        {loading ? (
          <div className="Loading-Message">Carregando produtos...</div>
        ) : (
          <ProductList 
            products={filteredProducts} 
            onProductClick={handleProductClick}
          />
        )}
      </div>
    </div>
  );
}

export default Marketplace;
