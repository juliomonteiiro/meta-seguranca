import React from "react";
import "./CartPage.css";
import { useLocation } from "react-router-dom";

export function CartPage() {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };

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
                            <p>Valor unitário: {product.price}</p>
                            <p>Valor total: {/* Calcule o valor total aqui */}</p>
                        </div>
                    </div>
                    <div className="CartPage-ProductAmount">
                        <p>Quantidade: {/* Quantidade do produto aqui */}</p>
                        <button>Remover</button>
                    </div>
                </div>
            ))}

            <div className="CartPage-Footer">
                <div className="CartPage-Price">
                    <p>Valor total do pedido: {/* Soma dos valores */}</p>
                    <p>Taxas/descontos: {/* Taxas/descontos */}</p>
                    <p>Valor final da compra: {/* Valor final */}</p>
                </div>
                <div className="CartPage-Buttons">
                    <button>Comprar Agora</button>
                    <button>Continuar Comprando</button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
