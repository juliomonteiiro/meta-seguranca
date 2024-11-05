const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middlewares/corsMiddleware');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
const PORT = 3001;

// Middlewares
app.use(bodyParser.json());
app.use(corsMiddleware);

// Rotas
app.use('/api', budgetRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
