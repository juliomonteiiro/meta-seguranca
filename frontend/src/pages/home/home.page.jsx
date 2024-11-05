import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import BackgroundDesktop from '../../assets/images/Background-Desktop.jpg';
import BackgroundMobile from '../../assets/images/Background-Mobile.jpg';
import { Doubt } from '../../components/doubt/doubt';

export function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 639);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.HomeContainer}>
            <img src={isMobile ? BackgroundMobile : BackgroundDesktop} alt="Imagem de fundo" />
            <div className={styles.Title}>
                <h1>
                    Temos a solução perfeita para sua segurança!
                </h1>
                <h2>
                    Serviço de qualidade e tecnologia avançada.
                </h2>
            </div>
            <div className={styles.Doubt}>
                <Doubt />
            </div>
        </div>
    );
}
