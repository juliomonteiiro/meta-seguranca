import React from "react";
import './category.css'
import CategoryIcon from "../../../assets/images/Category.png";

export function Category(
    {   categories, 
        selectedCategory, 
        onSelectCategory, 
        showCategories, 
        toggleCategories, 
        windowWidth
    }){
        return (
            <div className="CategoryFilter">
                {windowWidth <= 1000 && (
                <div className="Category" onClick={toggleCategories}>
                <img src={CategoryIcon} alt="Category Icon" />
                </div>
                )}
      
                {showCategories && (
                    <div className="Container-category">
                    <div className="Category-list">
                        <h1>Categorias</h1>
                      <ul>
                        {categories.map((category, index) => (
                            <li
                            key={index}
                            onClick={() => {
                                onSelectCategory(category);
                                if (windowWidth <= 1000) toggleCategories(); 
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
            </div>
  );
}
