import React from "react";
import "./ProductPage-Image.css";

import { useLocation } from "react-router-dom";

export function ProductPageImage(){

    const location = useLocation();
    const { product } = location.state || {}; 

    return(
        <div className="ProductPage-Image">
            <img src={product.image} alt={product.title} /> 
        </div>
    )
}
