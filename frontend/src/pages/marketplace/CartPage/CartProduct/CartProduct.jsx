import React from "react";
import styles from "./CartProduct.module.css";
import CartProductImage from "../CartProductImage/CartProductImage";
import CartProductDescription from "../CartDescription/CartDescription";

const CartProduct = ({ product, updateQuantity, removeFromCart }) => {

  return (
    <div className={styles.CartProduct}>
      <div className={styles.CartProductContent}>
        <CartProductImage image={product.image} title={product.title} />
        <CartProductDescription title={product.title} price={product.price} quantity={product.quantity}  product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
      </div>
    </div>
  );
};

export default CartProduct;
