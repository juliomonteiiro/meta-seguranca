import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ProductPage.css';
import { ProductButton } from "./ProductPage-Buttons/ProductPage-Buttons";
import { ProductPageHeader } from "./ProductPage-Header/ProductPage-Header";
import { ProductPageImage } from "./ProductPage-Image/ProductPage-Image";
import { ProductPageTitle } from "./ProductPage-Title/ProductPage-Title";
import { ProductPagePrice } from "./ProductPage-Price/ProductPage-Price";
import { ProductPageDescription } from "./ProductPage-Description/ProductPage-Description";
import { ProductPageNumber } from "./ProductPage-Buttons/ProductPage-Number/ProductPage-Number";
import { useCart } from "..//CartPage/CartContext/CartContext";

export function ProductPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { product } = location.state || {};

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/Cart");
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
                        <ProductPageNumber />
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
