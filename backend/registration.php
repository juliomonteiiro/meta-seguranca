<?php 

// Configuração de CORS para permitir requisições do frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Conexão com o banco de dados
$con = new mysqli("localhost", "root", "", "meta-seguranca");

if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
} else {
    // Recebe os dados da requisição
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    // Extrai os valores do JSON
    $user = $dData['user'];
    $email = $dData['email'];
    $pass = $dData['pass'];

    $result = "";        

    // Verifica se os campos não estão vazios
    if($user != "" && $email != "" && $pass != ""){
        // Query de inserção
        $sql = "INSERT INTO usuarios(nome, email, senha) VALUES('$user', '$email', '$pass')";
        
        // Executa a query
        $res = mysqli_query($con, $sql);
        
        if($res){
            $result = "Usuário cadastrado com sucesso!";
        } else {
            // Captura e exibe o erro do MySQL
            $result = "Erro ao cadastrar usuário: " . mysqli_error($con);
        }
    } else {
        $result = "Todos os campos são obrigatórios.";
    }

    // Fecha a conexão
    $con->close();

    // Retorna a resposta como JSON
    $response = array("result" => $result);
    echo json_encode($response);
}

?>
