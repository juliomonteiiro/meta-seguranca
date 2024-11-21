const corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin: *");  // Origem permitida
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");  // Cabeçalhos permitidos
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Métodos permitidos
    res.header("Access-Control-Allow-Credentials", "true");  // Permite credenciais (cookies, headers de autenticação, etc.)

    // Se a requisição for OPTIONS (pré-vôo), responde com um status 200 e retorna os cabeçalhos CORS necessários
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();  // Passa para o próximo middleware
};

module.exports = corsMiddleware;
