const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');  // A rota onde está a lógica de upload de produtos

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve as imagens da pasta 'uploads/products' quando solicitado
// Isso torna as imagens acessíveis publicamente através de URLs como: 
// http://localhost:3001/uploads/products/nome-da-imagem.jpg
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));

// Rotas para produtos
app.use('/api', productRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
