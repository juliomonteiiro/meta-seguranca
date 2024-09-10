import React from 'react'
import './footer.css'
import Maps from '../maps/index'
import { FaFacebook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
   <div className="footer">
        <div className="sb__footer section-padding">
            <div className="sb__footer-links">
                <div className="sb__footer-links_div">
                <h4>Nossa localização:</h4>
                   
                <Maps/>
                  
                </div>
                <div className="sb__footer-links_div">
                    <h4>Menu</h4>
                    <a href="">
                        <p>Inicio</p>
                    </a>
                    <a href="">
                        <p>Serviços</p>
                    </a>
                    <a href="">
                        <p>Sobre Nós</p>
                    </a>
                  
                    <a href="">
                        <p>Contato</p>
                    </a>                
                </div>   
                <div className="sb__footer-links_div">
                    <h4>Menu</h4>
                    <a href="">
                        <p>Inicio</p>
                    </a>
                    <a href="">
                        <p>Serviços</p>
                    </a>
                    <a href="">
                        <p>Sobre Nós</p>
                    </a>
                  
                    <a href="">
                        <p>Contato</p>
                    </a>                
                </div>   
                <div className="sb__footer-links_div">
                    <h4>Contato</h4>
                        <div className="socialmedia"> 
                        <a href=""><FaFacebook /></a>     
                        <a href=""><IoLogoWhatsapp /></a>   
                        <a href=""><FaPhoneAlt /></a>   
                        <a href=""><FaEnvelope /></a>   
                        </div>
                </div>             
            </div>
            
            <hr></hr>

            <div className="sb__footer-below">
                <div className="sb__footer-copyright">
                    <p>
                        @{new Date().getFullYear()} Meta Segurança Eletronica. Todos os direitos reservados.
                    </p>
                </div>
                <div className="sb__footer-below-links">
                    <a href=""><div><p>Termos & Condições</p></div></a>
                    <a href=""><div><p>Privacidade</p></div></a>
                    <a href=""><div><p>Segurança</p></div></a>
                    <a href=""><div><p>Declaração de Cookies</p></div></a>
                </div>
            </div>

        </div>
   </div>
  )
}

export default Footer