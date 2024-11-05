import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styles from "./forgot-password.module.css";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(""), 15000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError("Insira seu email!");
            return;
        }

        const url = "http://localhost/backend/forgot-password.php"; // Endpoint for forgot password
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = { email };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na resposta do servidor");
                }
                return response.json();
            })
            .then((response) => {
                setMsg(response.result || "Instruções para redefinir a senha foram enviadas para seu email.");
            })
            .catch((err) => {
                setError("Ocorreu um erro: " + err.message);
            });
    };

    return (
        <div className={styles.log}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Esqueci minha senha</h1>
                <p>
                    {msg ? (
                        <span className={styles.success}>{msg}</span>
                    ) : (
                        <span className={styles.error}>{error}</span>
                    )}
                </p>
                <InputText
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                />
                <Button className={styles.forgot} type="submit">
                    Enviar
                </Button>
                <p>
                    <Link to="/login" className={styles.login}>Voltar para o Login</Link>
                </p>
            </form>
        </div>
    );
}
