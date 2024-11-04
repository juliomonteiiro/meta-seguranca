import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styles from "./registration.module.css";

const API_URLS = {
    registration: "http://localhost/backend/registration.php",
    checkUser: "http://localhost/backend/checkuser.php",
    checkEmail: "http://localhost/backend/checkemail.php"
};

const ERROR_MESSAGES = {
    emptyUser: "Insira seu nome!",
    emptyEmail: "Insira seu email!",
    emptyPassword: "Insira sua senha!",
    shortPassword: "Senha deve ter pelo menos 8 caracteres!",
    passwordMismatch: "A senha não corresponde, confirme sua senha!",
    userRequired: "Nome é obrigatório!",
    emailRequired: "Email é obrigatório!",
    registrationError: "Ocorreu um erro ao registrar: ",
    checkUserError: "Erro ao verificar usuário: ",
    checkEmailError: "Erro ao verificar email: ",
    emptyCpf: "Insira seu CPF!",
    emptyPhone: "Insira seu telefone!",
    emptyBirthdate: "Insira sua data de nascimento!",
    invalidCpf: "CPF inválido, deve conter apenas números!",
    underage: "Você deve ter pelo menos 18 anos!"
};

const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length > 10) {
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
        return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        return value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        return value.replace(/(\d*)/, '($1');
    }
};

export function Registration() {
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        pass1: "",
        pass2: "",
        cpf: "",
        phone: "",
        birthdate: ""
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(""), 15000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === "phone" ? formatPhoneNumber(value) : value;
        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue
        }));
        setError("");
    };

    const validateFields = () => {
        const { user, email, pass1, pass2, cpf, phone, birthdate } = formData;

        if (!user) return ERROR_MESSAGES.emptyUser;
        if (!email) return ERROR_MESSAGES.emptyEmail;
        if (!pass1) return ERROR_MESSAGES.emptyPassword;
        if (pass1.length < 8) return ERROR_MESSAGES.shortPassword;
        if (pass1 !== pass2) return ERROR_MESSAGES.passwordMismatch;
        if (!cpf) return ERROR_MESSAGES.emptyCpf;
        if (!phone) return ERROR_MESSAGES.emptyPhone;
        if (!birthdate) return ERROR_MESSAGES.emptyBirthdate;
        
        // Validar CPF
        if (!/^\d{11}$/.test(cpf)) return ERROR_MESSAGES.invalidCpf; // CPF deve conter 11 dígitos
        
        // Validar idade
        const birthDate = new Date(birthdate);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 18) return ERROR_MESSAGES.underage;

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // Enviar apenas números para o backend
            const cleanPhone = formData.phone.replace(/\D/g, ''); // Remove formatação
            const response = await fetch(API_URLS.registration, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, phone: cleanPhone, pass: formData.pass2 })
            });
            const data = await response.json();
            setMsg(data[0]?.result || "Cadastro realizado com sucesso!");
            setFormData({
                user: "",
                email: "",
                pass1: "",
                pass2: "",
                cpf: "",
                phone: "",
                birthdate: ""
            });
        } catch (err) {
            setError(ERROR_MESSAGES.registrationError + err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkAvailability = async (type) => {
        const value = formData[type];
        if (!value) {
            setError(type === "user" ? ERROR_MESSAGES.userRequired : ERROR_MESSAGES.emailRequired);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(API_URLS[type === "user" ? "checkUser" : "checkEmail"], {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ [type]: value })
            });
            const data = await response.json();
            setMsg(data[0]?.result || (type === "user" ? "Usuário disponível." : "Email disponível."));
        } catch (err) {
            setError(type === "user" ? ERROR_MESSAGES.checkUserError + err.message : ERROR_MESSAGES.checkEmailError + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.reg}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <p>
                    {msg ? (
                        <span className={styles.success}>{msg}</span>
                    ) : (
                        <span className={styles.error}>{error}</span>
                    )}
                </p>
                <InputText
                    type="text"
                    name="user"
                    placeholder="Nome"
                    value={formData.user}
                    onChange={handleInputChange}
                    onBlur={() => checkAvailability("user")}
                />
                <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => checkAvailability("email")}
                />
                <InputText
                    type="text"
                    name="cpf"
                    placeholder="CPF (somente números)"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    pattern="\d*"
                    title="Apenas números são permitidos."
                    required
                />
                <InputText
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    title="Apenas números são permitidos."
                    required
                />
                <InputText
                    type="date"
                    name="birthdate"
                    placeholder="Data de Nascimento"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    required
                />
                <InputText
                    type="password"
                    name="pass1"
                    placeholder="Senha"
                    value={formData.pass1}
                    onChange={handleInputChange}
                    required
                />
                <InputText
                    type="password"
                    name="pass2"
                    placeholder="Confirme a senha"
                    value={formData.pass2}
                    onChange={handleInputChange}
                    required
                />
                <Button className={styles.registration} type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Criar perfil"}
                </Button>
                <p>
                    Já tem sua conta? <Link to="/login" className={styles.login}>Faça Login</Link>
                </p>
            </form>
        </div>
    );
}
