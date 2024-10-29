<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $res = mysqli_query($con, $sql);

    if (mysqli_num_rows($res) > 0) {
        // Gerar um token (por simplicidade, uma string aleatória)
        $token = bin2hex(random_bytes(16));
        
        // Aqui normalmente enviaria o token para o email do usuário
        // Por enquanto, retornar no response
        $result = "Instruções para redefinir a senha foram enviadas para seu email.";
        

        // $updateTokenSql = "UPDATE usuarios SET reset_token='$token' WHERE email='$email'";
        // mysqli_query($con, $updateTokenSql);
        
    } else {
        $result = "Email não encontrado.";
    }
} else {
    $result = "O email é obrigatório.";
}
$con->close();
$response = array("result" => $result);
echo json_encode($response);
?>
