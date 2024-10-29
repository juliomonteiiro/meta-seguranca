import React, { useEffect, useState } from "react";
import './marketplace.css';
import { Header } from "./header/header";
import { ProductList } from "./product/product";
import Chaveiro from "../../assets/images/chaveiro.png";
import Tag from "../../assets/images/tag.png";
import { useNavigate } from "react-router-dom";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  
  const products = [
    { id: "1", image: Tag, title: "Etiqueta Adesiva Control ID", link: "/product-page", price: "R$ 10,00", category: "Tag", infos: "Tag adesivo veicular da marca CONTROL ID frequência 125mhz. Específico para uso em antenas da marca CONTROL ID."},
    { id: "2", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "/product-page", price: "R$ 15,00", category: "Chaveiro", infos: "Tag RFID passivo somente leitura com furo para ser usado como chaveiro. Possui código único pré-gravado de 64bits. Feito em ABS é resistente e pode ser usado em aplicações de controle de acesso e segurança, programas de fidelidade, marcação de ponto, etc."},
    { id: "3", image: Tag, title: "Etiqueta Adesiva Control ID", link: "/product-page", price: "R$ 10,00", category: "Tag", infos: "Tag adesivo veicular da marca CONTROL ID frequência 125mhz. Específico para uso em antenas da marca CONTROL ID." },
    { id: "4", image: Chaveiro, title: "Controle de proximidade Intelbras", link: "/product-page", price: "R$ 15,00", category: "Chaveiro", infos: "Tag RFID passivo somente leitura com furo para ser usado como chaveiro. Possui código único pré-gravado de 64bits. Feito em ABS é resistente e pode ser usado em aplicações de controle de acesso e segurança, programas de fidelidade, marcação de ponto, etc."},
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
        <ProductList 
          products={filteredProducts} 
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
}

export default Marketplace;
