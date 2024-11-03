import React from "react";
import { ProductPageNumber } from "../../ProductPage/ProductPage-Buttons/ProductPage-Number/ProductPage-Number";
import styles from "./CartQuantityController.module.css";

const CartQuantityController = ({ quantity, onQuantityChange }) => (
  <div className={styles.CartQuantityController}>
    <ProductPageNumber
      initialQuantity={quantity}
      maxQuantity={10000}
      onQuantityChange={onQuantityChange}
      isCartPage={true}
    />
  </div>
);

export default CartQuantityController;
