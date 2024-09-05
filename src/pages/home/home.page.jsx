import React from 'react';
import './home.css';
import backgroundImage from '../../assets/images/bg-img.png'

export function Home() {
    return (
        <div className="Home-Container">
            <img src={backgroundImage} alt="Imagem de fundo" />
                <div className='Title'>
                    <h1>
                        Temos a solução perfeita para sua segurança!
                    </h1>
                    <h2>
                        Fornecer soluções de segurança, tecnologia e eletrônica para os nossos clientes; 
                        estabelecer com os colaboradores, clientes e parceiros uma relação de longo prazo, 
                        superando sempre as expectativas.
                    </h2>
                </div>
        </div>
    );
}