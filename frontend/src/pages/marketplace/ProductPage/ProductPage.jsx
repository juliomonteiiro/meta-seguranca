// ProductPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ProductPage.css';
import { ProductButton } from "./ProductPage-Buttons/ProductPage-Buttons";
import { ProductPageHeader } from "./ProductPage-Header/ProductPage-Header";
import { ProductPageImage } from "./ProductPage-Image/ProductPage-Image";
import { ProductPageTitle } from "./ProductPage-Title/ProductPage-Title";
import { ProductPagePrice } from "./ProductPage-Price/ProductPage-Price";
import { ProductPageDescription } from "./ProductPage-Description/ProductPage-Description";
import { ProductPageNumber } from "./ProductPage-Buttons/ProductPage-Number/ProductPage-Number";
import { useCart } from "../CartPage/CartContext/CartContext";

export function ProductPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(1); // Inicializa a quantidade como 1

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity }; // Adiciona a quantidade selecionada ao produto
        addToCart(productWithQuantity); // Passa o produto com a quantidade ao adicionar
        navigate("/Cart"); // Navega para a página do carrinho
    };

    const handleBuyNow = () => {
        handleAddToCart(); // Adiciona o produto ao carrinho
        navigate("/Cart"); // Navega para a página do carrinho
    };

    return (
        <div className="ProductPage-Container">
            <ProductPageHeader />
            <div className="ProductPage-Content">
                <ProductPageImage product={product} />
                <div className="ProductPage-Tools">
                    <ProductPageTitle title={product.title} />
                    <ProductPagePrice price={product.price} />
                    <div className="ProductPage-Buttons">
                        <ProductPageNumber
                            title="Quantidade"
                            initialQuantity={1} // A quantidade inicial é 1
                            onQuantityChange={(newQuantity) => setQuantity(newQuantity)} // Atualiza a quantidade selecionada
                        />
                        <ProductButton onClick={handleBuyNow}>Comprar Agora</ProductButton>
                        <ProductButton className="addToCartButton" onClick={handleAddToCart}>
                            Adicionar ao Carrinho
                        </ProductButton>
                    </div>
                </div>
            </div>
            <ProductPageDescription description={product.infos} />
        </div>
    );
}

export default ProductPage;
