const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { loginUser, checkUser, checkEmail, getUserData, registerUser, editProfile } = require('../controllers/userController');

// Configuração do multer para armazenar a imagem de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads/', 'user/');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Garante que o nome da imagem seja único
    }
});

const upload = multer({ storage });

// Rota para login
router.post('/login', loginUser);

// Rota para verificar se o nome de usuário já está em uso
router.post('/check_user', checkUser);

// Rota para verificar se o e-mail já está cadastrado
router.post('/check_email', checkEmail);

// Rota para obter os dados de um usuário
router.get('/userdata', getUserData);

// Rota para registrar um novo usuário
router.post('/register', upload.single('profileImage'), registerUser);

// Rota para editar o perfil do usuário
router.put('/user/:userId', upload.single('profileImage'), editProfile);

module.exports = router;
