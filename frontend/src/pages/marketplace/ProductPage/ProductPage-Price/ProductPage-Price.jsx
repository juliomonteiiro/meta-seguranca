import React from "react";
import "./ProductPage-Price.css";

import { useLocation } from "react-router-dom";

export function ProductPagePrice(){

    const location = useLocation();
    const { product } = location.state || {}; 

    return(
        <div className="ProductPage-Price">
            <p>Preço: {product.price}</p> 
        </div>
    )
}
