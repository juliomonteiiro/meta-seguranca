import React, { useEffect, useState } from "react";
import './marketplace.css';
import { Header } from "./header/header";
import { ProductList } from "./product/product";
import Chaveiro from "../../assets/images/chaveiro.png";
import Tag from "../../assets/images/tag.png";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const products = [
    { id: "1", image: Tag, title: "Etiqueta Adesiva Control ID", link: "https://google.com", price: "R$ 10,00", category: "Tag" },
    { id: "2", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "https://youtube.com", price: "R$ 15,00", category: "Chaveiro" },
    { id: "3", image: Tag, title: "Etiqueta Adesiva Control ID", link: "https://google.com", price: "R$ 10,00", category: "Tag" },
    { id: "4", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "https://youtube.com", price: "R$ 15,00", category: "Chaveiro" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Tag", "Chaveiro", "Eletrônicos"];
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
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
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
