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

$token = $dData['token'];
$password = $dData['password'];
$result = "";        

if ($token != "" && $password != "") {
    // Verifique se o token é válido
    $sql = "SELECT * FROM usuarios WHERE reset_token='$token'";
    $res = mysqli_query($con, $sql);

    if ($res && mysqli_num_rows($res) > 0) {
        // Hash da nova senha
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Atualize a senha no banco de dados
        $sql = "UPDATE usuarios SET senha='$hashedPassword', reset_token=NULL WHERE reset_token='$token'";
        $updateRes = mysqli_query($con, $sql);

        if ($updateRes) {
            $result = "Senha redefinida com sucesso!";
        } else {
            $result = "Erro ao redefinir a senha: " . mysqli_error($con);
        }
    } else {
        $result = "Token inválido ou expirado.";
    }
} else {
    $result = "Todos os campos são obrigatórios.";
}

$con->close();
$response = array("result" => $result);
echo json_encode($response);
?>
