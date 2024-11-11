const db = require('../db/config');
const path = require('path');

// Função para obter os produtos
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

// Função para criar um novo produto
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

// Função para editar um produto
const editProduct = (req, res) => {
    const { id } = req.params; // O ID do produto vem pela URL
    const { nome, descricao, preco, categoria } = req.body;
    const imagem = req.file ? req.file.filename : null;

    let sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ?';
    let params = [nome, descricao, preco, categoria];

    // Se a imagem foi enviada, deve-se incluir a atualização da imagem também
    if (imagem) {
        sql += ', imagem = ?';
        params.push(imagem);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao editar produto', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.status(200).json({ message: 'Produto editado com sucesso' });
    });
};

// Função para excluir um produto
const deleteProduct = (req, res) => {
    const { id } = req.params; // O ID do produto vem pela URL

    const sql = 'DELETE FROM produtos WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir produto', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.status(200).json({ message: 'Produto excluído com sucesso' });
    });
};

module.exports = { getProducts, createProduct, editProduct, deleteProduct };
