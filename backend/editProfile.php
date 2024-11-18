<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if ($con->connect_error) {
    echo json_encode(["result" => "Erro de conexão: " . $con->connect_error]);
    exit();
}

if (!isset($_POST['userId'])) {
    echo json_encode(["result" => "ID do usuário não fornecido."]);
    exit();
}

$userId = $_POST['userId'];
$user = $_POST['user'] ?? '';
$phone = $_POST['phone'] ?? '';
$profileImage = $_FILES['profileImage'] ?? null;

$result = "";

if ($user !== "" && $phone !== "") {
    // Verificar se uma imagem foi enviada
    $profileImagePath = null;
    if ($profileImage && $profileImage['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/user/';
        $fileExtension = pathinfo($profileImage['name'], PATHINFO_EXTENSION);
        $profileImagePath = $uploadDir . uniqid() . '.' . $fileExtension;

        if (!move_uploaded_file($profileImage['tmp_name'], $profileImagePath)) {
            echo json_encode(["result" => "Erro ao fazer upload da imagem de perfil"]);
            exit();
        }
    }

    // Atualizar os dados do usuário
    $sql = "UPDATE usuarios SET nome = ?, telefone = ?";
    
    // Se uma nova imagem foi carregada, adicionar o campo para foto de perfil
    if ($profileImagePath) {
        $sql .= ", foto_perfil = ?";
    }

    $sql .= " WHERE id = ?";

    $stmt = $con->prepare($sql);
    
    if ($profileImagePath) {
        $stmt->bind_param("ssss", $user, $phone, $profileImagePath, $userId);
    } else {
        $stmt->bind_param("sss", $user, $phone, $userId);
    }

    if ($stmt->execute()) {
        $result = "Perfil atualizado com sucesso!";
    } else {
        $result = "Erro ao atualizar perfil: " . $stmt->error;
    }
} else {
    $result = "Nome e telefone são obrigatórios.";
}

$con->close();
echo json_encode(["result" => $result]);

?>
