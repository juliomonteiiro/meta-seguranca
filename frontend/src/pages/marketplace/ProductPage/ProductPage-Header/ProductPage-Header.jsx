import React from "react";
import "./ProductPage-Header.css";

import { useLocation } from "react-router-dom";

export function ProductPageHeader(){

    const location = useLocation();
    const { product } = location.state || {}; 

    return(
        <div className="ProductPage-Header">
                <h2>{product.title}</h2>
        </div>
    )
}