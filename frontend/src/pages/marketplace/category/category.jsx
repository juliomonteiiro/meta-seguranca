import React from "react";
import './category.css';
import CategoryIcon from "../../../assets/images/Category.png";

export function Category({
  categories, 
  selectedCategory, 
  onSelectCategory, 
  showCategories, 
  toggleCategories, 
  windowWidth
}) {
  const isMobileView = windowWidth <= 1000;

  return (
    <div className="CategoryFilter">

      {isMobileView && (
        <div className="Category" onClick={toggleCategories}>
          <img src={CategoryIcon} alt="Category Icon" />
        </div>
      )}

      {showCategories && (
        <div className="Container-category">
          <div className="Category-list">
            <h2>Categorias</h2>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelectCategory(category);
                    if (isMobileView) toggleCategories();
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
