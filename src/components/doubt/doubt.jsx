import React, { useState, useEffect } from "react";
import "./main.css";
import { Button } from "../form/button/index";
import duvida from '../../assets/images/duvida.png';

export function Doubt() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Verifica a largura inicial da tela
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth <= 600 ? (
        <a href="/outra-tela" className="Doubt-icon">
          <img src={duvida} alt="Ícone de dúvida" />
        </a>
      ) : (
        <div className="Container">
          <p>Tem alguma dúvida ou quer saber mais a respeito?</p>
          <Button>Fale Conosco</Button>
        </div>
      )}
    </>
  );
}
