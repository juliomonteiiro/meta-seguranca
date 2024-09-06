import React from "react";
import "./main.css";
import {Button} from "../form/button/index"

export function Doubt(){
    return(
        <div className="Container">
            <p>Tem alguma duvida ou quer saber mais a respeito?</p>
                <Button>Fale Conosco</Button>
        </div>
    )
}