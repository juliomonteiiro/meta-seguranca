import React from "react";
import "./ProductPage-Title.css";

import { useLocation } from "react-router-dom";

export function ProductPageTitle(){

    const location = useLocation();
    const { product } = location.state || {}; 

    return(
        <div className="ProductPage-Title">
            <h2>{product.title}</h2> 
        </div>
    )
}
