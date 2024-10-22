<?php 

// Configuração de CORS para permitir requisições do frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Conexão com o banco de dados
$con = new mysqli("localhost", "root", "", "meta-seguranca");

// Verifica se a conexão falhou
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
} else {
    // Recebe os dados da requisição
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    // Extrai o valor do email
    $email = $dData['email'];

    $result = "";        

    // Verifica se o campo email não está vazio
    if($email != ""){
        // Query para verificar se o email já está cadastrado
        $sql = "SELECT * FROM usuarios WHERE email='$email'";
        
        // Executa a query
        $res = mysqli_query($con, $sql);

        if($res){
            // Verifica se o email já está no banco de dados
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

    // Fecha a conexão
    $con->close();

    // Retorna a resposta como JSON
    $response = array("result" => $result);
    echo json_encode($response);
}

?>
