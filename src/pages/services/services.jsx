import React from "react";
import "./services.css";
import CFTV from '../../assets/images/CFTV.png';
import ALARME from '../../assets/images/ALARME.png';
import CONTROLE from '../../assets/images/CONTROLE-ACESSO.png';
import CERCA from '../../assets/images/CERCA.png';

export function Services() {
  // Lista de serviços
  const services = [
    {
      image: CFTV,
      title: "CFTV",
      text: "Instalamos sistemas de alarme avançados após análise personalizada, conectados à nossa central 24 horas.",
    },
    {
      image: ALARME,
      title: "Alarme",
      text: "Após avaliação, instalamos câmeras de alta tecnologia nos pontos estratégicos de seu imóvel. ",
    },
    {
      image: CONTROLE,
      title: "Controle de acesso",
      text: "Instalamos cercas elétricas para proteção eficaz de seu imóvel.A cerca elétrica previne invasões com um sistema eficiente.",
    },
    {
      image: CERCA,
      title: "Proteção perimetral",
      text: "solução ideal para o controle de fluxo e maior segurança em condomínios, empresas e indústrias.", 
    },
  ];

  return (
    <div className="Services-Container">
      <h1>Serviços</h1>
      <div className="Services-Grid">
        {services.map((service, index) => (
          <div className="card" key={index}>
            <div className="icon">
              <img src={service.image} alt={service.title} />
            </div>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
