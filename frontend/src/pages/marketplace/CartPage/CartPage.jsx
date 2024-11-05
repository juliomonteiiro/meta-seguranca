import React from "react";
import styles from "./CartPage.module.css";
import { useCart } from "./CartContext/CartContext";
import CartProduct from "./CartProduct/CartProduct";
import CartFooter from "./CartFooter/CartFooter";
import CartImage from "../../../assets/images/carrinho-vazio.png"
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const BuyProducts = () => {
    navigate("/products");
};

  if (cartItems.length === 0) {
    return(
        <div className={styles.CartPageEmpty}>
            <img src={CartImage} onClick={BuyProducts}/>
            <h1>Nenhum produto no carrinho</h1>
        </div>
    )
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
