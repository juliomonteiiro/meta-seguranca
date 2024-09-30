import React, { useState } from "react";
import "./budget.css";
import "@fontsource/lexend-deca"; 
import { InputText } from "../../components/form/input";
import { Button } from "../../components/form/button";
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

    // Estado para o campo de telefone com formatação
    const [phone, setPhone] = useState('');

    // Função para formatar o telefone
    const formatPhoneNumber = (value) => {
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 5) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/(\d*)/, '($1');
        }

        return value;
    };

    // Função para lidar com mudanças no campo de telefone
    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
    };

    return (
        <div className="Container-budget">
            <div className="Title-budget">
                <h1>
                    Faça um Orçamento com a <span className="meta-color">Meta</span>
                </h1>
                <h2>
                    Mande uma mensagem para nós e faça um orçamento conosco
                </h2>
            </div>
            <form className="Form-budget" action="https://webhook.site/6b44bbe7-bebb-4d67-95f6-b7aa0ddcd693" method="post">
                <InputText type="text" placeholder="Nome*" required />
                <InputText type="text" placeholder="Empresa/Local*" required />
                <InputText type="number" placeholder="CPF/CNPJ*" required />
                
                {/* Campo de telefone com formatação */}
                <InputText 
                    type="tel" 
                    value={phone}
                    onChange={handlePhoneChange} 
                    maxLength="15" 
                    placeholder="Telefone*" 
                    required 
                />

                <InputText type="email" autocomplete="email" placeholder="E-mail*" required />
                <InputText placeholder="Endereço*" required />
                <SelectInput    
                    options={solicitacaoOptions}
                    placeholder="Tipo de serviço*" 
                    required
                />
                <TextArea placeholder="Solicitação*" required/>
                <Button className="Form-budget">Enviar</Button>
            </form>
            <br />
            <br />
        </div>
    );
}
