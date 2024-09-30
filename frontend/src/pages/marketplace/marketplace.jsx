import React, { useState } from "react";
import "./marketplace.css";
import Chaveiro from "../../assets/images/chaveiro.png";
import Tag from "../../assets/images/tag.png";
import Searchimg from "../../assets/images/pesquisa.png";
import Category from "../../assets/images/Category.png";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const products = [
    {
      id: "1",
      image: Tag,
      title: "Etiqueta Adesiva Control ID",
      link: "https://google.com",
      price: "R$ 10,00",
      category: "Tag",
    },
    {
      id: "2",
      image: Chaveiro,
      title: "Controle de proximidade Intelbras",
      link: "https://youtube.com",
      price: "R$ 15,00",
      category: "Chaveiro",
    },
    {
      id: "3",
      image: Tag,
      title: "Etiqueta Adesiva Control ID",
      link: "https://google.com",
      price: "R$ 10,00",
      category: "Tag",
    },
    {
      id: "4",
      image: Chaveiro,
      title: "Controle de proximidade Intelbras",
      link: "https://youtube.com",
      price: "R$ 15,00",
      category: "Chaveiro",
    },
  ];

  const categories = ["Todos", "Tag", "Chaveiro", "Eletrônicos"];

 
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="Marketplace">
      <h1>Produtos</h1>

      <div className="Filter">
        <div className="Search-bar">
          <input
            className="Search-input"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
          />
          <img src={Searchimg} alt="Search Icon" />
        </div>
        <div className="Category" onClick={toggleCategories}>
          <img src={Category} alt="Category Icon"/>
        </div>
      </div>
    
    <div className="Container-category">
      {showCategories && (
        <div className="Category-list">
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCategory(category)
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
      )}
    </div>

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
              <p>Comprar</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}