import React from "react";
import styles from "./CartProduct.module.css";
import CartProductImage from "../CartProductImage/CartProductImage";
import CartProductDescription from "../CartDescription/CartDescription";
import CartQuantityController from "../CartQuantityControler/CartQuantityControle";
import CartRemoveButton from "../CartRemoveButton/CartRemoveButton";
import { useCart } from "../CartContext/CartContext";

const CartProduct = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.CartProduct}>
      <div className={styles.CartProductContent}>
        <CartProductImage image={product.image} title={product.title} />
        <CartProductDescription title={product.title} price={product.price} quantity={product.quantity} />
        <CartQuantityController
          quantity={product.quantity}
          onQuantityChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
        />
        <CartRemoveButton onRemove={() => removeFromCart(product.id)} />
      </div>
    </div>
  );
};

export default CartProduct;
