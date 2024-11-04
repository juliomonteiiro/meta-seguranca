// ProductPage-Number.jsx
import React, { useState } from "react";
import styles from "./ProductPage-Number.module.css";

export function ProductPageNumber({
  className,
  selectContainerClassName,
  selectNumberClassName,
  buttonClassName,
  quantityInputClassName,
  initialQuantity = 1,
  maxQuantity = 10000,
  title,
  onQuantityChange
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      });
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
      onQuantityChange(value);
    }
  };

  return (
    <div className={`${styles.ProductPageNumber} ${className}`}>
      <div className={`${styles.SelectContainer} ${selectContainerClassName}`}>
        <h1>{title}</h1>
        <div className={`${styles.SelectNumber} ${selectNumberClassName}`}>
          <button onClick={handleDecrement} className={`${styles.ProductPageNumberButton} ${buttonClassName}`}>-</button>
          <input
            type="number"
            className={`${styles.ProductPageNumberQuantity} ${quantityInputClassName}`}
            value={quantity}
            onChange={handleChange}
            min="1"
            max={maxQuantity}
          />
          <button onClick={handleIncrement} className={`${styles.ProductPageNumberButton} ${buttonClassName}`}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPageNumber;
