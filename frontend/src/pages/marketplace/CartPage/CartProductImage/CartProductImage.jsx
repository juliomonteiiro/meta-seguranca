import React from "react";
import styles from "./CartProductImage.module.css";

const CartProductImage = ({ image, title }) => (
  <div className={styles.CartProductImage}>
    <img src={image} alt={title} />
  </div>
);

export default CartProductImage;