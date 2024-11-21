const db = require('../db/config');
const bcrypt = require('bcryptjs');

const loginUser = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ result: 'erro', message: 'E-mail e senha são obrigatórios.' });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ result: 'erro', message: 'Erro ao verificar o usuário', error: err });
        }

        if (results.length > 0) {
            const usuario = results[0];

            // Verificar se a senha fornecida é correta
            bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
                if (err) return res.status(500).json({ result: 'erro', message: 'Erro ao comparar senhas.' });

                if (isMatch) {
                    // Salvar o e-mail e o id do usuário na sessão
                    req.session.user_email = usuario.email;
                    req.session.user_id = usuario.id;

                    return res.json({
                        result: 'success',
                        message: 'Login realizado com sucesso!',
                        user: { id: usuario.id, nome: usuario.nome, email: usuario.email }
                    });
                } else {
                    return res.status(400).json({ result: 'erro', message: 'Senha incorreta.' });
                }
            });
        } else {
            return res.status(404).json({ result: 'erro', message: 'Usuário não encontrado.' });
        }
    });
};

// Função para verificar se o nome de usuário já existe
const checkUser = (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ message: 'Nome de usuário é obrigatório.' });
    }

    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    db.query(sql, [user], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao verificar o nome de usuário", error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Nome de usuário já está em uso." });
        }

        return res.json({ message: "Nome de usuário disponível." });
    });
};

// Função para verificar se o e-mail já está cadastrado
const checkEmail = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao verificar o e-mail", error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        return res.json({ message: "E-mail disponível." });
    });
};

// Função para obter os dados do usuário
const getUserData = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "ID de usuário não fornecido." });
    }

    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao obter dados do usuário", error: err });
        }

        if (results.length > 0) {
            const usuario = results[0];
            // Verificar se a foto de perfil existe
            if (usuario.foto_perfil) {
                usuario.foto_perfil_url = `http://localhost:3001/uploads/user/${usuario.foto_perfil}`;
            } else {
                usuario.foto_perfil_url = null;
            }
            return res.json(usuario);
        } else {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
    });
};

// Função para registrar um novo usuário
const registerUser = (req, res) => {
    const { user, email, pass, cpf, phone, birthdate } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!user || !email || !pass || !cpf || !phone || !birthdate) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const hashedPassword = bcrypt.hashSync(pass, 10);
    let profileImagePath = null;

    if (profileImage) {
        profileImagePath = `user/${profileImage}`;
    }

    const sql = "INSERT INTO usuarios (nome, email, senha, cpf, telefone, data_nasc, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [user, email, hashedPassword, cpf, phone, birthdate, profileImagePath], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
        }
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso', id: result.insertId });
    });
};

// Função para editar o perfil de um usuário
const editProfile = (req, res) => {
    const { userId } = req.params;
    const { user, phone } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!user || !phone) {
        return res.status(400).json({ message: 'Nome e telefone são obrigatórios.' });
    }

    let sql = 'UPDATE usuarios SET nome = ?, telefone = ?';
    let params = [user, phone];

    if (profileImage) {
        sql += ', foto_perfil = ?';
        params.push(`user/${profileImage}`);
    }

    sql += ' WHERE id = ?';
    params.push(userId);

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar perfil', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Perfil atualizado com sucesso.' });
    });
};

module.exports = { loginUser, checkUser, checkEmail, getUserData, registerUser, editProfile };
