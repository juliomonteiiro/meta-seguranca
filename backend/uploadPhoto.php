<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => "Erro de conexão: " . mysqli_connect_error()]);
    exit();
}

// Verifica se o arquivo foi enviado
if ($_FILES['foto'] && isset($_POST['email'])) {
    $email = $_POST['email'];
    $foto = $_FILES['foto'];

    // Caminho onde as fotos serão salvas
    $uploadDir = 'uploads/fotos_perfil/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fotoNome = uniqid() . '_' . basename($foto['name']);
    $fotoCaminho = $uploadDir . $fotoNome;

    if (move_uploaded_file($foto['tmp_name'], $fotoCaminho)) {
        $sql = "UPDATE usuarios SET foto_perfil='$fotoCaminho' WHERE email='$email'";
        $res = mysqli_query($con, $sql);

        if ($res) {
            echo json_encode(["result" => "Foto de perfil atualizada com sucesso!", "foto_perfil" => $fotoCaminho]);
        } else {
            echo json_encode(["result" => "Erro ao salvar caminho da foto: " . mysqli_error($con)]);
        }
    } else {
        echo json_encode(["result" => "Erro ao fazer upload da foto."]);
    }
} else {
    echo json_encode(["result" => "Dados insuficientes."]);
}

$con->close();
?>
