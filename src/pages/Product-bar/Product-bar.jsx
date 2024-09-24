import React from "react"; 
import "./Product-bar.css"
import Arrow from "../../assets/images/right-arrow.png"

export function Productbar() {

    // Lista de principais produtos
  const products = [
    {
        id: '1',
        image: 'https://www.controlid.com.br/assets/images/controle-de-acesso/tag-uhf-pet-list.webp',
        title: 'Etiqueta Adesiva Control ID',
        link: 'https://google.com',
    },
    {
        id: '2',
        image: 'https://images.tcdn.com.br/img/img_prod/738352/90_chaveiro_p_aproximacao_intelbras_rfid_125_mhz_th_1000_5561_2_484ab602fa9ed45f896821907b2fc4c9.png',
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
                        <img src={product.image}/>
                        <h2>{product.title}</h2>
                        <div className="Button" onClick={() => window.location.href = product.link}>
                            <p>Veja Mais</p>
                            <img src={Arrow}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}