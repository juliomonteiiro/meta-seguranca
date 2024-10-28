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

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  return (
    <div className="ProductPageNumber">
      <div className="Select-Container">
        <h1>Quantidade: </h1>
        <div className="Select-Number">
          <button onClick={handleDecrement} className="ProductPageNumber-button">-</button>
          <input
            type="number"
            className="ProductPageNumber-quantity"
            value={quantity}
            onChange={handleChange}
            min="1"
            max={maxQuantity}
          />
          <button onClick={handleIncrement} className="ProductPageNumber-button">+</button>
        </div>
      </div>
    </div>
  );
}
