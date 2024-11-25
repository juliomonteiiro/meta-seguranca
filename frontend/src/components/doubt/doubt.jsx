import React, { useState, useEffect } from "react";
import styles from "./doubt.module.css"; 
import duvida from '../../assets/images/duvida.png';

export function Doubt() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWhatsapp = () =>{
    window.open('https://api.whatsapp.com/send/?phone=19981357968&text&type=phone_number&app_absent=0');
    }

    useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    }, []);

  return (
    <>
      {windowWidth <= 639 ? (
        <div className={styles["Doubt-icon"]} onClick={handleWhatsapp}>
          <img src={duvida} alt="Ícone de dúvida" />
        </div>
      ) : (
        <div className={styles.Container}>
          <p>Tem alguma dúvida ou quer saber mais a respeito?</p>
          <div className={styles.ButtonWhatsapp} onClick={handleWhatsapp}>
            <h1>Entrar em contato</h1>
          </div>
        </div>
      )}
    </>
  );
}
