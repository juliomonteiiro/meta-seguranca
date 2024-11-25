import React from 'react';
import './FooterStyles.css';
import Maps from '../maps/index';
import { FaFacebook, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-map">
          <h4>Nossa localização:</h4>
          <Maps />
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Menu</h4>
            <nav>
              <Link to="/">Início</Link>
              <Link to="/services">Serviços</Link>
              <Link to="/about">Sobre Nós</Link>
              <Link to="/contact">Contato</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4>Produtos</h4>
            <nav>
              <Link to="/products">Chaveiros</Link>
              <Link to="/products">Eletrônicos</Link>
              <Link to="/products">Tags</Link>
              <Link to="/products">Todos os Produtos</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <div className="social-icons">
              <Link to="https://www.facebook.com/metasegurancaeletronica/?locale=pt_BRk" aria-label="Facebook"><FaFacebook /></Link>
              <Link to="https://api.whatsapp.com/send/?phone=19981357968&text&type=phone_number&app_absent=0" aria-label="WhatsApp"><IoLogoWhatsapp /></Link>
              <Link to="(19)98135-7968" aria-label="Telefone"><FaPhoneAlt /></Link>
              <Link to="/email" aria-label="Email"><FaEnvelope /></Link>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              @{new Date().getFullYear()} Meta Segurança Eletrônica. Todos os direitos reservados.
            </p>
          </div>
          {/* <div className="footer-legal">
            <Link to="/termos">Termos & Condições</Link>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/seguranca">Segurança</Link>
            <Link to="/cookies">Declaração de Cookies</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
