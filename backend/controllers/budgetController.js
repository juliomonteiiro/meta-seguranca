const db = require('../db/config');

const createBudget = (req, res) => {
    const { nome, empresa, cpf_cnpj, telefone, email, endereco, tipo_servico, solicitacao } = req.body;
    
    const sql = "INSERT INTO orcamentos (nome, empresa, cpf_cnpj, telefone, email, endereco, tipo_servico, solicitacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, empresa, cpf_cnpj, telefone, email, endereco, tipo_servico, solicitacao], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao inserir o orçamento", error: err });
        }
        return res.status(200).json({ message: "Orçamento criado com sucesso", id: result.insertId });
    });
};

module.exports = { createBudget };
