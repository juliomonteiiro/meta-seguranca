import React from "react"; 
import "./Product-bar.css";
import Arrow from "../../assets/images/right-arrow.png";
import Chaveiro from "../../assets/images/chaveiro.png";
import Tag from "../../assets/images/tag.png";
import { Link } from "react-router-dom";

export function Productbar() {

  const products = [
    {
        id: '1',
        image: Tag,
        title: 'Etiqueta Adesiva Control ID',
        link: 'https://google.com',
    },
    {
        id: '2',
        image: Chaveiro,
        title: 'Controle de proximidade Intelbras',
        link: 'https://youtube.com',
    },
    {
        id: '3',
        image: Tag,
        title: 'Etiqueta Adesiva Control ID',
        link: 'https://google.com',
    },
    {
        id: '4',
        image: Chaveiro,
        title: 'Controle de proximidade Intelbras',
        link: 'https://youtube.com',
    },

  ];

    return(
        <div className="Product-Container">
            <h1>Principais produtos</h1>

            <div className="Product-list">
                {products.map((product)=> (
                        <div className="Product" key={product.id}>
                        <img src={product.image} alt=""/>
                        <h2>{product.title}</h2>
                        <div className="Button-product" onClick={() => window.location.href = product.link}>
                            <p>Veja Mais</p>
                            <img src={Arrow} alt=""/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="All">
                <Link to="/">Ver todos...</Link>
            </div>
        </div>
    )
}