import React from 'react';
import './home.css';
import backgroundImage from '../../assets/images/bg-img.png'
import { Doubt } from '../../components/doubt/doubt';
import { Search } from '../../components/search/search'
import Navbar from '../../components/menu/Navbar';


export function Home() {
    return (
        <div className="Home-Container">
            <img src={backgroundImage} alt="Imagem de fundo" />
                <Navbar/>

                <Search/>
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
                <div className='Doubt'>
                    <Doubt/>
                </div>
        </div>
    );
}