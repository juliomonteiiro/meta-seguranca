const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, createProduct } = require('../controllers/productController');

// Configuração do multer para fazer o upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Caminho para salvar as imagens na pasta 'uploads/products'
        const uploadDir = path.join(__dirname, '..', 'uploads', 'products');
        cb(null, uploadDir); // Define o diretório de destino para as imagens
    },
    filename: (req, file, cb) => {
        // Usando timestamp para garantir nome único para a imagem
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com a extensão original
    }
});

const upload = multer({ storage });

// Rota para pegar todos os produtos
router.get('/products', getProducts);

// Rota para adicionar um novo produto
router.post('/create_product', upload.single('imagem'), createProduct);

module.exports = router;
