import React from "react";
import "./budget.css"
import "@fontsource/lexend-deca"; 
import {InputText} from "../../components/form/input";
import {Button} from "../../components/form/button";
import { SelectInput } from "../../components/form/select-input";
import { TextArea } from "../../components/form/text-area";

export function Budget() {

    const solicitacaoOptions = [
        { value: 'cftv', label: 'CFTV' },
        { value: 'controle-acesso', label: 'Controle de acesso' },
        { value: 'cerca-eletrica', label: 'Cerca elétrica' },
        { value: 'concertina', label: 'Concertina' },
        { value: 'rede-laminada', label: 'Rede laminada' },
        { value: 'alarme', label: 'Alarme' },
    ];

    return(
        <div className="Container-budget">
            <div className="Title-budget">
                <h1>
                    Faça um Orçamento com a <span className="meta-color">Meta</span>
                </h1>
                <h2>
                    Mande uma mensagem para nós e faça um orçamento conosco
                </h2>
            </div>
            <form className="Form-budget">
                <InputText placeholder="Nome" required />
                <InputText placeholder="Empresa/Local" required />
                <InputText placeholder="CPF/CNPJ" required />
                <InputText placeholder="Telefone" required />
                <InputText placeholder="E-mail" required />
                <InputText placeholder="Endereço" required />
                <SelectInput 
                    options={solicitacaoOptions}
                    placeholder="Tipo de serviço" 
                />
                <TextArea placeholder="Solicitação"/>
                <Button text="ENVIAR" />
            </form>
        </div>
    )
}
