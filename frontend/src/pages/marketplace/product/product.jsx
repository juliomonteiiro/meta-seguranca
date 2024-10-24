import React from "react";
import './Product.css';

export function ProductList({ products }) {  // Alterado para 'products'
    return (
        <div className="Marketplace-list">
            {products.map((product) => (  // Alterado para 'products'
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
