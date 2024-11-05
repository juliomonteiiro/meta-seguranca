import React from "react";
import styles from "./CartProductDescription.module.css";
import CartQuantityController from "../CartQuantityControler/CartQuantityControle";
import CartRemoveButton from "../CartRemoveButton/CartRemoveButton";
import { useCart } from "../CartContext/CartContext";

const CartProductDescription = ({ title, price, quantity, id, product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.CartProductDescription}>
      <div className={styles.CartProductDescriptionTitle}>
        <h2>{title}</h2>
      </div>
      <div className={styles.CartProductDescriptionValues}>
        <h3>Valor total: R$ {(price * quantity).toFixed(2)}</h3>
        <CartQuantityController
          quantity={quantity}
          onQuantityChange={(newQuantity) => updateQuantity(product.id, newQuantity)} // Use product.id aqui
          isCartPage={true}
        />
      </div>
      <CartRemoveButton onRemove={() => removeFromCart(product.id)} />
    </div>
  );
};

export default CartProductDescription;
