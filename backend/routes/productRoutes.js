const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, createProduct, editProduct, deleteProduct } = require('../controllers/productController');

// Configuração do multer para armazenar a imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads', 'products');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Rota para obter todos os produtos
router.get('/products', getProducts);

// Rota para criar um novo produto
router.post('/create_product', upload.single('imagem'), createProduct);

// Rota para editar um produto existente
router.put('/products/:id', upload.single('imagem'), editProduct);

// Rota para excluir um produto
router.delete('/products/:id', deleteProduct);

module.exports = router;
