import { Button } from "../../components/form/button";
import { InputText } from "../../components/form/input";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import styles from "./registration.module.css";

export function Registration() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(""), 15000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        setError("");

        switch (type) {
            case "user":
                setUser(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "pass1":
                setPass1(value);
                break;
            case "pass2":
                setPass2(value);
                break;
            default:
                break;
        }
    };

    const validateFields = () => {
        if (!user) return "Insira seu nome!";
        if (!email) return "Insira seu email!";
        if (!pass1) return "Insira sua senha!";
        if (pass1.length < 8) return "Senha deve ter pelo menos 8 caracteres!";
        if (pass1 !== pass2) return "A senha não corresponde, confirme sua senha!";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const url = "http://localhost/backend/registration.php";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = { user, email, pass: pass2 };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                setMsg(response[0]?.result || "Cadastro realizado com sucesso!");
                setUser("");
                setEmail("");
                setPass1("");
                setPass2("");
            })
            .catch((err) => {
                setError("Ocorreu um erro ao registrar: " + err.message);
            });
    };

    const checkUser = () => {
        if (!user) {
            setError("Nome é obrigatório!");
            return;
        }
        const url = "http://localhost/backend/checkuser.php";
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        const data = { user };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                setMsg(response[0]?.result || "Usuário disponível.");
            })
            .catch((err) => {
                setError("Erro ao verificar usuário: " + err.message);
            });
    };

    const checkEmail = () => {
        if (!email) {
            setError("Email é obrigatório!");
            return;
        }
        const url = "http://localhost/backend/checkemail.php";
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
                setMsg(response[0]?.result || "Email disponível.");
            })
            .catch((err) => {
                setError("Erro ao verificar email: " + err.message);
            });
    };

    const checkPassword = () => {
        if (pass1.length < 8) {
            setError("Senha deve ter pelo menos 8 caracteres!");
        }
    };

    return (
        <div className={styles.reg}>
            <h1>Cadastro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    value={user}
                    onChange={(e) => handleInputChange(e, "user")}
                    onBlur={checkUser}
                />
                <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                    onBlur={checkEmail}
                />
                <InputText
                    type="password"
                    name="pass1"
                    placeholder="Senha"
                    value={pass1}
                    onChange={(e) => handleInputChange(e, "pass1")}
                    onBlur={checkPassword}
                />
                <InputText
                    type="password"
                    name="pass2"
                    placeholder="Confirme a senha"
                    value={pass2}
                    onChange={(e) => handleInputChange(e, "pass2")}
                />
                <Button className={styles.registration} type="submit">
                    Criar perfil
                </Button>
                <p>
                    Já tem sua conta? <Link to="/login" className="login">Faça Login</Link>
                </p>
            </form>
        </div>
    );
}
