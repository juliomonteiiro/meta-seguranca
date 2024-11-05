import React from "react";
import "@fontsource/lexend-deca"; 
import styles from "./About.module.css"; 
import about from "../../assets/images/metaseguranca.png";

export function About() {
  return (
    <div className={styles.about}>
        <div className={`${styles.aboutText} ${styles.texto}`}>
          <h1>Sobre a <strong>Meta</strong></h1>
          <p>
            Com mais de 30 anos de experiência no segmento de 
            segurança e proteção, os profissionais da META 
            seguem um padrão de qualidade diferenciado, por 
            meio de consultoria, tecnologia de ponta e excelência 
            nos serviços prestados. Além de contar com o constante 
            aperfeiçoamento da equipe, a META utiliza equipamentos 
            e soluções de última geração dos mais conceituados fornecedores, 
            pensando sempre na melhor opção custo-benefício para os seus clientes.
            Apesar de estar localizada na cidade de Campinas, a empresa atende 
            diversas cidades da região, como São Paulo, Araraquara, Americana, 
            Santa Bárbara D´Oeste, Sumaré, Hortolândia e Jundiaí. Conta, também, 
            com um estoque de peças para reposição em casos emergenciais, e possui 
            uma central de monitoramento 24 horas com monitores e atendentes 
            treinados e qualificados para atendimento imediato.
          </p>
        </div>
        <div className={styles.aboutImage}>
          <img src={about} alt="Sobre a empresa Meta" />
        </div>
      </div>
  );
}

export default About;
