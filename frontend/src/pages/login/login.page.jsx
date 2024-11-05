import React, { useState, useEffect } from 'react'; // Remova useContext
import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Mantenha esta importação
import styles from "./login.module.css";

export function Login() {
    const { login } = useAuth(); // Obtém a função de login do contexto
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(""), 15000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setError("");

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const validateFields = () => {
        if (!email) return "Insira seu email!";
        if (!password) return "Insira sua senha!";
        if (password.length < 8) return "Senha deve ter pelo menos 8 caracteres!";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const url = "http://localhost/backend/login.php";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = { email, senha: password }; // Corrige a chave para 'senha', conforme necessário
        
        fetch(url, {
            method: "POST",
            headers,
            credentials: 'include', // Necessário para enviar cookies de sessão
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na rede ou no servidor");
                }
                return response.json();
            })
            .then((response) => {
                // Verifica se o login foi bem-sucedido
                if (response.result === "success") {
                    login({ email }); // Atualiza o estado de login no contexto
                    navigate("/meta-seguranca"); // Redireciona após o login bem-sucedido
                } else {
                    setError(response.message); // Mostra a mensagem de erro específica
                }
            })
            .catch((err) => {
                setError("Ocorreu um erro ao fazer login: " + err.message);
            });
        };
        

    return (
        <div className={styles.log}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p>
                    {msg ? (
                        <span className={styles.success}>{msg}</span>
                    ) : (
                        <span className={styles.error}>{error}</span>
                    )}
                </p>
                <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                />
                <InputText
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={handleInputChange}
                />
                <Button className={styles.login} type="submit">
                    Entrar
                </Button>
                <p>
                    <Link to="/forgot-password" className={styles.forgot}>Esqueci minha senha.</Link>
                </p>
            </form>
        </div>
    );
}
