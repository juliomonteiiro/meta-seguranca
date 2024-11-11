const db = require('../db/config');
const path = require('path');


const getProducts = (req, res) => {
    const sql = "SELECT * FROM produtos"; 

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao buscar produtos", error: err });
        }

        const formattedProducts = results.map((product) => ({
            id: product.id.toString(),
            image: `http://localhost:3001/uploads/products/${product.imagem}`, 
            title: product.nome,
            link: `/ProductPage`,
            price: product.preco.toFixed(2),
            category: product.categoria,
            infos: product.descricao,
        }));

        res.json(formattedProducts);
    });
};

const createProduct = (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;
    const imagem = req.file ? req.file.filename : null;

    if (!imagem) {
        return res.status(400).json({ message: "Imagem é obrigatória" }); 
    }

    const sql = "INSERT INTO produtos (nome, descricao, preco, categoria, imagem) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome, descricao, preco, categoria, imagem], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao inserir produto", error: err });
        }
        return res.status(201).json({ message: "Produto criado com sucesso", id: result.insertId });
    });
};

module.exports = { getProducts, createProduct };
