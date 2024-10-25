import React, { useState } from "react";
import './category.css';
import CategoryIcon from "../../../assets/images/List-Category.png";

export function Category({ setSelectedCategory }) {
    const [showFilters, setShowFilters] = useState(false);
    const categories = ["Todos", "Tag", "Chaveiro", "Eletrônicos"];

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowFilters(false); 
    };

    return (
        <div className="Category-Container" onClick={toggleFilters}>
            <img src={CategoryIcon} alt="Category Icon" />
            {showFilters && (
                <ul className="Category-Filters">
                    <div className="Category-Title">
                        <p>Categorias</p>
                    </div>
                    {categories.map((category) => (
                        <li key={category} onClick={() => handleCategorySelect(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}