import React from "react";
import './ProductPage.css';

export function ProductPage(){
    return(
        <div className="ProductPage-Container">
            <div className="ProductPage-Header">
                {/* Nome do produto */}
            </div>
            <div className="ProductPage-Content">
                <div className="ProductPage-Image">
                    {/* Imagem do produto */}
                </div>
                <div className="ProductPage-Tools">
                    <div className="ProductPage-Title">
                        {/* Modelo do equipamento */}
                    </div>
                    <div className="ProductPage-Buttons">
                        {/* Botões de ação */}
                    </div>
                </div>
            </div>
            <div className="ProductPage-Description">
                {/* Descrição das funcionalidades do projeto */}
            </div>
        </div>
    )
}

export default ProductPage;