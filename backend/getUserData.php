<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if ($con->connect_error) {
    echo json_encode(["result" => "Erro de conexão: " . $con->connect_error]);
    exit();
}

// Verifique se a sessão do usuário está ativa
if (!isset($_SESSION['user_email'])) {
    echo json_encode(["result" => "Usuário não autenticado."]);
    exit();
}

$email = $_SESSION['user_email'];
$stmt = null; // Inicialize $stmt como null para evitar o erro

if (!empty($email)) {
    // Usando prepared statements
    $stmt = $con->prepare("SELECT * FROM usuarios WHERE email=?");
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $res = $stmt->get_result();

        if ($res && $res->num_rows > 0) {
            $user = $res->fetch_assoc();
            
            // Adicione o caminho completo para a imagem de perfil
            if (!empty($user['foto_perfil'])) {
                $user['foto_perfil_url'] = "http://localhost/backend/" . $user['foto_perfil'];
            } else {
                $user['foto_perfil_url'] = null; // Ou defina um caminho para uma imagem padrão, se desejar
            }
            
            echo json_encode($user); // Retorna os dados do usuário com a URL da imagem de perfil
        } else {
            echo json_encode(["result" => "Usuário não encontrado."]);
        }
    } else {
        echo json_encode(["result" => "Erro ao preparar a consulta: " . $con->error]);
    }
} else {
    echo json_encode(["result" => "E-mail não fornecido."]);
}

if ($stmt) {
    $stmt->close(); // Fechar a declaração apenas se $stmt foi criado com sucesso
}
$con->close(); // Fechar a conexão
?>
