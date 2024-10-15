import React, { useState, useEffect } from "react";
import "./marketplace.css";
import Chaveiro from "../../assets/images/chaveiro.png";
import Tag from "../../assets/images/tag.png";
import Searchimg from "../../assets/images/pesquisa.png";
import Category from "../../assets/images/Category.png";
import Logo from "../../assets/images/logo-all-white.png"
import Carrinho from "../../assets/images/carrinho-de-compras.png"
import {Title} from "../../components/title/title"


export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


// Função para atualizar o tamanho da tela
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

// Função para aparecer e sumir a lista de categorias
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

// Função para a lista ficar do lado da pagina quando o width for maior que 1000px
  useEffect(() => {
    setShowCategories(windowWidth > 1000); 
  }, [windowWidth]);

// Função para mostrar todas as categorias
  const toggleCategories = () => {
    if (windowWidth <= 1000) {
      setShowCategories(!showCategories);
    }
  };

// Lista de Array de produtos
  const products = [
    { id: "1", image: Tag, title: "Etiqueta Adesiva Control ID", link: "https://google.com", price: "R$ 10,00", category: "Tag" },
    { id: "2", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "https://youtube.com", price: "R$ 15,00", category: "Chaveiro" },
    { id: "3", image: Tag, title: "Etiqueta Adesiva Control ID", link: "https://google.com", price: "R$ 10,00", category: "Tag" },
    { id: "4", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "https://youtube.com", price: "R$ 15,00", category: "Chaveiro" },
  ];

// Lista de Array de categorias
  const categories = ["Todos", "Tag", "Chaveiro", "Eletrônicos"];

// Filtro de produtos por nome e categoria
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <div className="Marketplace">
      <Title></Title>
        <div className="Filter">
          <img src={Logo} className="Logo" alt="Logo"/>
          <div className="Search-bar">
            <input
              className="Search-input"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={Searchimg} alt="Search Icon" />  
          </div>
          {windowWidth <= 1000 && (
            <div className="Category" onClick={toggleCategories}>
              <img src={Category} alt="Category Icon" />
            </div>
          )}
          <div className="Shopping-trolly">
            <img src={Carrinho} alt="Carrinho de compra"/>
          </div>
        </div>


      <div className="Content-container">
        {showCategories && (
          <div className="Container-category">
            <div className="Category-list">
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategories(false);
                    }}
                    style={{
                      fontWeight: selectedCategory === category ? "bold" : "normal",
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


        <div className="Marketplace-list">
          {filteredProducts.map((product) => (
            <div className="Market-items" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.price}</p>
              <div
                className="Button"
                onClick={() => (window.location.href = product.link)}
              >
                <p>Ver Detalhes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
