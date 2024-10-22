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

    $email = $dData['email'];

    $result = "";        

    if($email != ""){
        $sql = "SELECT * FROM usuarios WHERE email='$email'";

        $res = mysqli_query($con, $sql);

        if($res){
            if(mysqli_num_rows($res) > 0){
                $result = "Email já está cadastrado!";
            } else {
                $result = "Email disponível.";
            }
        } else {
            $result = "Erro ao verificar o email: " . mysqli_error($con);
        }
    } else {
        $result = "O email não pode estar vazio.";
    }

    $con->close();

    $response = array("result" => $result);
    echo json_encode($response);
}

?>
