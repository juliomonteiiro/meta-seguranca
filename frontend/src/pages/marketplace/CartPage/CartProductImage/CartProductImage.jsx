import React from "react";
import styles from "./CartProductImage.module.css";

const CartProductImage = ({ image, title }) => (
  <div className={styles.CartProductImage}>
    <img src={image} className={styles.CartProductImg} alt={title} />
  </div>
);

export default CartProductImage;
