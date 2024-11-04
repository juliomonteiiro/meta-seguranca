import React from "react";
import styles from "./CartFooter.module.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const CartFooter = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleOrder = () => {
    alert("Seu pedido enviado, entraremos em contato em breve!");
  }

  return (
    <div className={styles.CartFooter}>
      <div className={styles.CartFooterPrice}>
        <p>Valor total do pedido: R$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>
      <div className={styles.CartFooterButtons}>
        <button onClick={handleOrder}>Finalizar pedido</button>
        <button onClick={handleContinueShopping}>Continuar Comprando</button>
      </div>
    </div>
  );
};

export default CartFooter;
