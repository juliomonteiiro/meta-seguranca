import React from "react";
import { useLocation } from "react-router-dom";
import './ProductPage.css';
import { ProductButton } from "./ProductPage-Buttons/ProductPage-Buttons";
import { ProductPageHeader } from "./ProductPage-Header/ProductPage-Header";
import { ProductPageImage } from "./ProductPage-Image/ProductPage-Image";
import { ProductPageTitle } from "./ProductPage-Title/ProductPage-Title";
import { ProductPagePrice } from "./ProductPage-Price/ProductPage-Price";
import { ProductPageDescription } from "./ProductPage-Description/ProductPage-Description";
import { ProductPageNumber } from "./ProductPage-Buttons/ProductPage-Number/ProductPage-Number";

export function ProductPage() {
    const location = useLocation();
    const { product } = location.state || {}; 

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="ProductPage-Container">
            <ProductPageHeader/>
            <div className="ProductPage-Content">
                <ProductPageImage/>
                <div className="ProductPage-Tools">
                    <ProductPageTitle/>
                    <ProductPagePrice/>
                    <div className="ProductPage-Buttons">
                        <ProductPageNumber/>
                        <ProductButton>Comprar Agora</ProductButton>
                        <ProductButton className="addToCartButton">Adicionar ao Carrinho</ProductButton>
                    </div>
                </div>
            </div>
            <ProductPageDescription/>
        </div>
    );
}

export default ProductPage;