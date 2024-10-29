import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import styles from "./redefine-password.module.css";

export function RedefinePassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(""), 15000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e, type) => {
        if (type === "password") {
            setPassword(e.target.value);
        } else if (type === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
        setError("");
    };

    const validateFields = () => {
        if (!password) return "Insira uma nova senha!";
        if (password.length < 8) return "Senha deve ter pelo menos 8 caracteres!";
        if (password !== confirmPassword) return "As senhas não correspondem!";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const url = "http://localhost/backend/redefine-password.php"; 
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = { token, password };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                setMsg(response.result || "Senha redefinida com sucesso!");
            })
            .catch((err) => {
                setError("Ocorreu um erro: " + err.message);
            });
    };

    return (
        <div className={styles.log}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Redefinir Senha</h1>
                <p>
                    {msg ? (
                        <span className={styles.success}>{msg}</span>
                    ) : (
                        <span className={styles.error}>{error}</span>
                    )}
                </p>
                <InputText
                    type="password"
                    placeholder="Nova Senha"
                    value={password}
                    onChange={(e) => handleInputChange(e, "password")}
                />
                <InputText
                    type="password"
                    placeholder="Confirme a Senha"
                    value={confirmPassword}
                    onChange={(e) => handleInputChange(e, "confirmPassword")}
                />
                <Button className={styles.redefine} type="submit">
                    Redefinir Senha
                </Button>
                <p>
                    <Link to="/login" className={styles.login}>Voltar para o Login</Link>
                </p>
            </form>
        </div>
    );
}
