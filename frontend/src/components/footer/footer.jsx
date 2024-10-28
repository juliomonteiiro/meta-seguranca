import React from 'react'
import './footer.css'
import Maps from '../maps/index'
import { FaFacebook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import {Link} from "react-router-dom";

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
                    <Link to="">
                        <p>Inicio</p>
                    </Link>
                    <Link to="">
                        <p>Serviços</p>
                    </Link>
                    <Link to="">
                        <p>Sobre Nós</p>
                    </Link>
                  
                    <Link to="">
                        <p>Contato</p>
                    </Link>                
                </div>   
                <div className="sb__footer-links_div">
                    <h4>Produtos</h4>
                    <Link to="">
                        <p>Câmeras</p>
                    </Link>
                    <Link to="">
                        <p>Sistemas</p>
                    </Link>
                    <Link to="">
                        <p>Tags</p>
                    </Link>
                  
                    <Link to="">
                        <p>Produtos</p>
                    </Link>                
                </div>   
                <div className="sb__footer-links_div">
                    <h4>Contato</h4>
                        <div className="socialmedia"> 
                        <Link to=""><FaFacebook /></Link>     
                        <Link to=""><IoLogoWhatsapp /></Link>   
                        <Link to=""><FaPhoneAlt /></Link>   
                        <Link to=""><FaEnvelope /></Link>   
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
                    <Link to=""><div><p>Termos & Condições</p></div></Link>
                    <Link to=""><div><p>Privacidade</p></div></Link>
                    <Link to=""><div><p>Segurança</p></div></Link>
                    <Link to=""><div><p>Declaração de Cookies</p></div></Link>
                </div>
            </div>

        </div>
   </div>
  )
}

export default Footer