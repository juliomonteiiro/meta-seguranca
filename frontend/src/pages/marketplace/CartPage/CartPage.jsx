// CartPage.jsx
import React from "react";
import "./CartPage.css";
import { useCart } from "./CartContext/CartContext"; // Importando o contexto do carrinho

export function CartPage() {
  const { cartItems, removeFromCart } = useCart(); // Obtendo `cartItems` e `removeFromCart` do contexto

  if (cartItems.length === 0) {
    return <div>O carrinho está vazio.</div>;
  }

  return (
    <div className="CartPage-Container">
      <div className="CartPage-Header">
        {/* Logo da Meta */}
        {/* Ícone de Usuário */}
      </div>

      {cartItems.map((product, index) => (
        <div key={index} className="CartPage-Product">
          <div className="CartPage-Content">
            <div className="CartPage-Image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="CartPage-Description">
              <h2>{product.title}</h2>
              <h3>Valor unitário: {product.price}</h3>
              <h4>Valor total: R$ {(product.price * product.quantity).toFixed(2)}</h4>
              <p>Quantidade: {product.quantity}</p>
                <button onClick={() => removeFromCart(product.id)}>Remover</button>
            </div>      
          </div>
        </div>
      ))}

      <div className="CartPage-Footer">
        <div className="CartPage-Price">
          <p>Valor total do pedido: R$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          <p>Taxas/descontos: {/* Taxas/descontos */}</p>
          <p>Valor final da compra: {/* Valor final */}</p>
        </div>
        <div className="CartPage-Buttons">
          <button>Finalizar pedido</button>
          <button>Continuar Comprando</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
