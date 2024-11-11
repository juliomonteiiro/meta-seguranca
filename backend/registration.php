<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => mysqli_connect_error()]);
    exit();
} 

$user = $_POST['user'] ?? '';
$email = $_POST['email'] ?? '';
$pass = $_POST['pass'] ?? '';
$cpf = $_POST['cpf'] ?? '';  
$phone = $_POST['phone'] ?? '';
$birthdate = $_POST['birthdate'] ?? '';
$profileImage = $_FILES['profileImage'] ?? null;

$result = "";        

if ($user !== "" && $email !== "" && $pass !== "" && $cpf !== "" && $phone !== "" && $birthdate !== "") {
    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
    $profileImagePath = null;

    if ($profileImage && $profileImage['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $fileExtension = pathinfo($profileImage['name'], PATHINFO_EXTENSION);
        $profileImagePath = $uploadDir . uniqid() . '.' . $fileExtension;

        if (!move_uploaded_file($profileImage['tmp_name'], $profileImagePath)) {
            echo json_encode(["result" => "Erro ao fazer upload da imagem de perfil"]);
            exit();
        }
    }

    $sql = "INSERT INTO usuarios (nome, email, senha, cpf, telefone, data_nasc, foto_perfil) VALUES ('$user', '$email', '$hashedPassword', '$cpf', '$phone', '$birthdate', '$profileImagePath')";
    $res = mysqli_query($con, $sql);

    if ($res) {
        $result = "Usuário cadastrado com sucesso!";
    } else {
        $result = "Erro ao cadastrar usuário: " . mysqli_error($con);
    }
} else {
    $result = "Todos os campos são obrigatórios.";
}

$con->close();
echo json_encode(["result" => $result]);



?>
 