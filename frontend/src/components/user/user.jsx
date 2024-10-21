import React from "react";
import './user.css'
import UserIcon from "../../assets/images/user.png"

export function User(){
    return(
        <div className="User-icon">
            <div className="User">
            <img src={UserIcon}/>
            </div>
        </div>
    )
}