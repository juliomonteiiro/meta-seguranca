import React from "react";
import "./ProductPage-Description.css";

import { useLocation } from "react-router-dom";

export function ProductPageDescription(){

    const location = useLocation();
    const { product } = location.state || {}; 

    return(
        <div className="ProductPage-Description">
            <h2>Descrição Geral</h2>
            <h3>{product.infos}</h3>
        </div>
    )
}
