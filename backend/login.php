<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => "Erro de conexão: " . mysqli_connect_error()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $senha = $data['senha'];

    $sql = "SELECT * FROM usuarios WHERE email=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res && $res->num_rows > 0) {
        $usuario = $res->fetch_assoc();
        if (password_verify($senha, $usuario['senha'])) {
            session_start();
            $_SESSION['user_email'] = $usuario['email'];
            
            // Log para confirmar que a sessão foi configurada
            error_log("Login bem-sucedido. E-mail salvo na sessão: " . $_SESSION['user_email']);
            
            echo json_encode(["result" => "success", "message" => "Login realizado com sucesso!"]);
        } else {
            echo json_encode(["result" => "erro", "message" => "Senha incorreta."]);
        }
    } else {
        echo json_encode(["result" => "erro", "message" => "Usuário não encontrado."]);
    }

    $stmt->close();
}

$con->close();
?>
