import React, { useState } from "react";
import './ProductPage-Number.css';

export function ProductPageNumber({ className, initialQuantity = 1, maxQuantity = 10 }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="ProductPageNumber">
        <div className="Select-Container">
            <h1>Quantidade: </h1>
            <div className="Select-Number">
                <button onClick={handleDecrement} className="ProductPageNumber-button">-</button>
                <span className="ProductPageNumber-quantity">{quantity}</span>
                <button onClick={handleIncrement} className="ProductPageNumber-button">+</button>
            </div>
        </div>
    </div>
  );
}
