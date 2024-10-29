import React from "react";
import "./CartPage.css";

export function CartPage(){
    return(
        <div className="CartPage-Container">
            <div className="CartPage-Header">
                {/*Logo da Meta*/}
                {/*Icone de User*/}
            </div>
            <div className="CartPage-Product">
                <div className="CartPage-Description">
                    <div className="CartPage-Image">
                        {/*Imagem do equipamento*/}
                    </div>
                    <div className="CartPage-Infos">
                        {/*Nome do produto*/}
                        {/*Valor unitário*/}
                        {/*Valor total*/}
                    </div>
                </div>
                <div className="CartPage-ProductAmount">
                    {/*Quantidade*/}
                    {/*Botão para excluir*/}
                </div>  
            </div>
            <div className="CartPage-Footer">
                <div className="CartPage-Price">
                    {/*Valor total do pedido*/}
                    {/*Taxas/descontos*/}
                    {/*Valor final da compra*/}
                </div>
                <div className="CartPage-Buttons">
                    {/*Botão de compra*/}
                    {/*Botão de continuar comprando*/}
                </div>
            </div>
        </div>
    )
}

export default CartPage;