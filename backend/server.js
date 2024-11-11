const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); 

const app = express();
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());


app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
