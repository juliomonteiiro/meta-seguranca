import React from "react";
import './product.css';

export function ProductList({ products, onProductClick }) {  // Recebe 'onProductClick' como prop
    return (
        <div className="Marketplace-list">
            {products.map((product) => (
                <div className="Market-items" key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <h2>{product.title}</h2>
                    <p>{product.price}</p>
                    <div
                        className="Button"
                        onClick={() => onProductClick(product)}  // Chama onProductClick ao invés de window.location.href
                    >
                        <p>Ver Detalhes</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
