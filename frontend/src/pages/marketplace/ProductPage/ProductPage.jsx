import React from "react";
import { useLocation } from "react-router-dom";
import './ProductPage.css';

export function ProductPage() {
    const location = useLocation();
    const { product } = location.state || {}; // Extrai o objeto produto do estado de navegação

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="ProductPage-Container">
            <div className="ProductPage-Header">
                <h1>{product.title}</h1>
            </div>
            <div className="ProductPage-Content">
                <div className="ProductPage-Image">
                    <img src={product.image} alt={product.title} /> {/* Exibe a imagem do produto */}
                </div>
                <div className="ProductPage-Tools">
                    <div className="ProductPage-Title">
                        <h2>{product.title}</h2> {/* Exibe o título */}
                    </div>
                    <div className="ProductPage-Price">
                        <p>Preço: {product.price}</p> 
                    </div>
                    <div className="ProductPage-Buttons">
                        {/* Botões de ação */}
                    </div>
                </div>
            </div>
            <div className="ProductPage-Description">
                <p>Descrição das funcionalidades do projeto.</p> {/* Descrição estática ou dinamicamente preenchida */}
            </div>
        </div>
    );
}

export default ProductPage;
