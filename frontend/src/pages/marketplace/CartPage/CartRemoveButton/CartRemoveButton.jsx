import React from "react";
import styles from "./CartRemoveButton.module.css";

const CartRemoveButton = ({ onRemove }) => (
  <div className={styles.CartRemoveButton}>
    <button onClick={onRemove}>Remover Produto</button>
  </div>
);

export default CartRemoveButton;
