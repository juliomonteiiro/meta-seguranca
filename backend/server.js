const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); 
const budgetRoutes = require('./routes/budgetRoutes'); 
const { loginUser, checkUser, checkEmail, getUserData, registerUser, editProfile } = require('./controllers/userController');

const app = express();

// Configuração do middleware para parsing de JSON
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,  // Importante para enviar cookies com a requisição
};

app.use(cors(corsOptions));

// Configuração de sessões
app.use(session({
    secret: 'secretkey',    // Chave secreta para assinar os cookies de sessão
    resave: false,          // Não resalva a sessão se não houve alterações
    saveUninitialized: true,// Não salva sessões não modificadas
    cookie: { secure: false } // Defina `secure: true` para HTTPS (produção)
}));

// Rota de login (com sessões)
app.post('/api/login', loginUser);

// Outras rotas...
app.post('/api/register', registerUser);
app.get('/api/user/:userId', getUserData);
app.put('/api/user/:userId', editProfile);
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));
app.use('/api', productRoutes);
app.use('/api', budgetRoutes);

// Função para verificar se o usuário está autenticado
app.get('/api/session', (req, res) => {
    if (req.session.user_email) {
        return res.json({
            message: "Usuário autenticado",
            user_email: req.session.user_email
        });
    }
    return res.status(401).json({ message: "Usuário não autenticado" });
});

// Função para logout (destruir a sessão)
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao destruir a sessão" });
        }
        res.json({ message: "Logout realizado com sucesso" });
    });
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
