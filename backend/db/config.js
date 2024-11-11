const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "meta-seguranca"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        throw err;
    }
    console.log("Conectado ao banco de dados MySQL.");
});

module.exports = db;
