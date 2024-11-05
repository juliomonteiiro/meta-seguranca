<?php

// Configuração de CORS e resposta em JSON
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Resposta em JSON

// Conexão com o banco de dados
$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => "Erro de conexão: " . mysqli_connect_error()]);
    exit();
}

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];
$result = "";

if ($email != "") {
    // Verificar se o e-mail existe na base de dados
    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $res = mysqli_query($con, $sql);

    if (mysqli_num_rows($res) > 0) {
        // Caso o e-mail seja encontrado, enviamos uma resposta dizendo que o e-mail foi encontrado
        // Agora redirecionamos para a página de redefinição de senha
        $result = "E-mail encontrado. Você será redirecionado para a página de redefinição de senha.";

        // Redirecionar para a página de redefinição de senha
        header("Location: http://localhost:3000/redefine-password/" . urlencode($email));
        exit();

    } else {
        $result = "E-mail não encontrado.";
    }
} else {
    $result = "O e-mail é obrigatório.";
}

$con->close();
$response = array("result" => $result);
echo json_encode($response);

?>
