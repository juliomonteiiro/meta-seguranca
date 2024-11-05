import React, { useState } from "react";
import styles from "./Budget.module.css";
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

    const [formData, setFormData] = useState({
        nome: '',
        empresa: '',
        cpf_cnpj: '',
        telefone: '',
        email: '',
        endereco: '',
        tipo_servico: '',
        solicitacao: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Campo alterado:", name, "Valor:", value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formatPhoneNumber = (value) => {
        value = value.replace(/\D/g, '');
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

    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setFormData({
            ...formData,
            telefone: formattedPhone
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/create_budget", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar o orçamento");
            }

            const result = await response.json();
            alert(result.message);
            setFormData({
                nome: '',
                empresa: '',
                cpf_cnpj: '',
                telefone: '',
                email: '',
                endereco: '',
                tipo_servico: '',
                solicitacao: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.containerBudget}>
            <div className={styles.titleBudget}>
                <h1>
                    Faça um Orçamento com a <span className={styles.metaColor}>Meta</span>
                </h1>
                <h2>Mande uma mensagem para nós e faça um orçamento conosco</h2>
            </div>
            <form className={styles.formBudget} onSubmit={handleSubmit}>
                <InputText name="nome" type="text" value={formData.nome} onChange={handleChange} placeholder="Nome*" required />
                <InputText name="empresa" type="text" value={formData.empresa} onChange={handleChange} placeholder="Empresa/Local*" required />
                <InputText name="cpf_cnpj" type="text" value={formData.cpf_cnpj} onChange={handleChange} placeholder="CPF/CNPJ*" required />
                
                <InputText 
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                    placeholder="Telefone*"
                    required 
                />
                <InputText name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail*" required />
                <InputText name="endereco" type="text" value={formData.endereco} onChange={handleChange} placeholder="Endereço*" required />
                <SelectInput 
                    className=""
                    options={solicitacaoOptions} 
                    optionSelected={formData.tipo_servico} 
                    handleChange={handleChange} 
                    placeholder="Tipo de serviço*" 
                    required 
                />
                <TextArea name="solicitacao" value={formData.solicitacao} onChange={handleChange} placeholder="Solicitação*" required />
                <Button type="submit" className={styles.button}>Enviar</Button>
            </form>
            <br />
            <br />
        </div>
    );
}
