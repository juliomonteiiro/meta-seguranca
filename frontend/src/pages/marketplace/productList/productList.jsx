// src/components/productList/ProductList.js

import React from "react";
import "./productList.css";

export function ProductList({ products }) {
  return (
    <div className="Marketplace-list">
      {products.map((product) => (
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
  );
}
