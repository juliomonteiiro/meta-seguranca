const db = require('../db/config');
const path = require('path');

// Função para pegar todos os produtos
const getProducts = (req, res) => {
    const sql = "SELECT * FROM produtos";  // Consulta para buscar produtos no banco

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao buscar produtos", error: err });
        }

        // Formatar os produtos para o formato desejado no frontend
        const formattedProducts = results.map((product) => ({
            id: product.id.toString(),
            image: `http://localhost:3001/uploads/products/${product.imagem}`, // Caminho da imagem com base na URL do servidor
            title: product.nome,
            link: `/ProductPage`,
            price: product.preco.toFixed(2),
            category: product.categoria,
            infos: product.descricao,
        }));

        res.json(formattedProducts);
    });
};

// Função para criar um novo produto
const createProduct = (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;
    const imagem = req.file ? req.file.filename : null; // Pega o nome do arquivo da imagem

    if (!imagem) {
        return res.status(400).json({ message: "Imagem é obrigatória" }); // Garantir que a imagem foi enviada
    }

    // Inserir produto no banco de dados com o nome da imagem
    const sql = "INSERT INTO produtos (nome, descricao, preco, categoria, imagem) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome, descricao, preco, categoria, imagem], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao inserir produto", error: err });
        }
        return res.status(201).json({ message: "Produto criado com sucesso", id: result.insertId });
    });
};

module.exports = { getProducts, createProduct };
