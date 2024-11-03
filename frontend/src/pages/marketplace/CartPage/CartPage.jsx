import React from "react";
import styles from "./CartPage.module.css";
import { useCart } from "./CartContext/CartContext";
import CartProduct from "./CartProduct/CartProduct";
import CartFooter from "./CartFooter/CartFooter";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <div>O carrinho está vazio.</div>;
  }

  return (
    <div className={styles.CartPageContainer}>
      {cartItems.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
      <CartFooter />
    </div>
  );
};

export default CartPage;
