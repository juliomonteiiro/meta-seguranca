<?php 
    
    session_start();

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
    $pass = $dData['pass'];

    $result = "";        

    if ($email != "" && $pass != "") {
        $sql = "SELECT * FROM usuarios WHERE email='$email'";
        $res = mysqli_query($con, $sql);
        
        if ($res && mysqli_num_rows($res) > 0) {
            $user = mysqli_fetch_assoc($res);
            
            // Verifica se a senha está correta
            if (password_verify($pass, $user['senha'])) {
                $_SESSION['user_email'] = $email; // Armazena o email na sessão
                $result = "Login bem-sucedido!";
            } else {
                $result = "Senha incorreta.";
            }
        } else {
            $result = "Email não encontrado.";
        }
    } else {
        $result = "Todos os campos são obrigatórios.";
    }

    $con->close();
    $response = array("result" => $result);
    echo json_encode($response);

?>
