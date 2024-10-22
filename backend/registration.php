<?php 


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$con = new mysqli("localhost", "root", "", "meta-seguranca");

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
} else {

    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $email = $dData['email'];
    $pass = $dData['pass'];

    $result = "";        


    if($user != "" && $email != "" && $pass != ""){
        $sql = "INSERT INTO usuarios(nome, email, senha) VALUES('$user', '$email', '$pass')";
        $res = mysqli_query($con, $sql);
        
        if($res){
            $result = "Usuário cadastrado com sucesso!";
        } else {
            $result = "Erro ao cadastrar usuário: " . mysqli_error($con);
        }
    } else {
        $result = "Todos os campos são obrigatórios.";
    }
    $con->close();
    $response = array("result" => $result);
    echo json_encode($response);
}

?>
