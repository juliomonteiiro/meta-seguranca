import React from "react";
import "@fontsource/lexend-deca"; 
import "./main.css"
import about from "../../assets/images/about.png"

export function About (){
    return(
        <div className="about">
            <div className="section">
                <div className="about-section texto">
                    <h1>Sobre a <strong>Meta</strong></h1>
                    <br />
                    <p>
                    Com mais de 30 anos de experiência no segmento de 
                    <br />segurança e proteção, os profissionais da META 
                    <br />seguem um padrão de qualidade diferenciado, por 
                    <br />meio de consultoria, tecnologia de ponta e excelência 
                    <br />nos serviços prestados.
                    <br />Além de contar com o constante aperfeiçoamento da 
                    <br />equipe, a META utiliza equipamentos e soluções de 
                    <br />última geração dos mais conceituados fornecedores, 
                    <br />pensando sempre na melhor opção custo-benefício 
                    <br />para os seus clientes.
                    <br />Apesar de estar localizada na cidade de Campinas, 
                    <br />a empresa atende diversas cidades da região, como 
                    <br />São Paulo, Araraquara, Americana, 
                    <br />Santa Bárbara D´Oeste, Sumaré, Hortolândia e Jundiaí. 
                    <br />Conta, também, com um estoque de peças para reposição 
                    <br />em casos emergenciais, e possui uma central de 
                    <br />monitoramento 24 horas com monitores e atendentes 
                    <br />treinados e qualificados para atendimento imediato.
                    </p>
                </div>
                <div className="about-section">
                    <img src={about} alt="" />
                </div>
            </div>
        </div>
    );
}

export default About