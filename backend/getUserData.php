<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start(); // Inicia a sessão para verificar o login

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => "Erro de conexão: " . mysqli_connect_error()]);
    exit();
}

// Verifica se o usuário está logado
if (isset($_SESSION['user_email'])) {
    $email = $_SESSION['user_email'];
    $sql = "SELECT nome, email, foto_perfil FROM usuarios WHERE email=?";
    
    // Prepara a consulta para evitar injeções SQL
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($res && $res->num_rows > 0) {
        $user = $res->fetch_assoc();
        echo json_encode(["result" => "success", "user" => $user]);
    } else {
        echo json_encode(["result" => "Erro ao encontrar dados do usuário."]);
    }
} else {
    echo json_encode(["result" => "Usuário não logado."]);
}

$stmt->close(); // Fecha a declaração
$con->close(); // Fecha a conexão
?>
