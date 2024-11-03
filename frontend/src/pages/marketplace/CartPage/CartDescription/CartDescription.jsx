import React from "react";
import styles from "./CartProductDescription.module.css";

const CartProductDescription = ({ title, price, quantity }) => (
  <div className={styles.CartProductDescription}>
    <h2>{title}</h2>
    <h3>Valor total: R$ {(price * quantity).toFixed(2)}</h3>
  </div>
);

export default CartProductDescription;
