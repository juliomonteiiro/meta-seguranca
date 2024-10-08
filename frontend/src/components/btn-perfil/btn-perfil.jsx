import React from "react";
import "./btn-perfil.css";
import User from "../../assets/images/user-icon.png"

export function Perfil() {
    return(
        <div className="User">
            <img src={User} alt="Icon"/>
        </div>
    );
}