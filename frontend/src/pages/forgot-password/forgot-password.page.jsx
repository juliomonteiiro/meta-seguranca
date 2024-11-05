import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar o hook useNavigate
import styles from "./forgot-password.module.css";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate(); // Hook para redirecionamento

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
            setError("Insira seu e-mail!");
            return;
        }

        const url = "http://localhost/backend/forgot-password.php"; // Endpoint para redefinir senha
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
            .then((response) => response.json())
            .then((response) => {
                setMsg(response.result);
                
                // Quando o redirecionamento for bem-sucedido, o usuário é direcionado para a página de redefinição
                if (response.result.includes("redirecionado")) {
                    // Aqui é o redirecionamento para a página de redefinição de senha
                    navigate(`/redefine-password/${email}`);
                }
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
