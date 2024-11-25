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

// CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend
    methods: 'GET,POST,DELETE,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,  // Necessário para enviar cookies
};
app.use(cors(corsOptions));

// Configuração de sessões
app.use(session({
    secret: 'secretkey',  
    resave: false,         
    saveUninitialized: true,
    cookie: {
        secure: false,  // Defina como false em desenvolvimento (caso esteja usando HTTP)
        httpOnly: true, // Impede que o cookie seja acessado via JavaScript
        maxAge: 1000 * 60 * 60 * 24 // Cookie expira após 1 dia
    }
}));


// Middleware de verificação de autenticação
const verifyAuth = (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    next();
};

// Rotas de login e perfil
app.post('/api/login', loginUser);
app.post('/api/register', registerUser);
app.get('/api/user', verifyAuth, getUserData);
app.put('/api/user/:userId', verifyAuth, editProfile);

// Função para verificar a sessão
app.get('/api/session', (req, res) => {
    if (req.session.user_email) {
        return res.json({ message: "Usuário autenticado", user_email: req.session.user_email });
    }
    return res.status(401).json({ message: "Usuário não autenticado" });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao destruir a sessão" });
        }
        res.json({ message: "Logout realizado com sucesso" });
    });
});

app.get('/api/session', (req, res) => {
    if (req.session.user_email) {
        return res.json({
            message: 'Usuário autenticado',
            user_email: req.session.user_email
        });
    } else {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
});

// Roteamento de Produtos e Orçamentos
app.use('/api', productRoutes);
app.use('/api', budgetRoutes);

// Servindo arquivos estáticos
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));
app.use('/uploads/user', express.static(path.join(__dirname, 'uploads', 'user')));

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
