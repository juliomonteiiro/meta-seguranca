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

    // Extrai o valor do nome de usuário
    $user = $dData['user'];

    $result = "";        

    // Verifica se o campo usuário não está vazio
    if($user != ""){
        // Query para verificar se o usuário já está cadastrado
        $sql = "SELECT * FROM usuarios WHERE nome='$user'";
        
        // Executa a query
        $res = mysqli_query($con, $sql);

        if($res){
            // Verifica se o usuário já está no banco de dados
            if(mysqli_num_rows($res) > 0){
                $result = "Usuário já está cadastrado!";
            } else {
                $result = "Usuário não está cadastrado.";
            }
        } else {
            $result = "Erro ao verificar o usuário: " . mysqli_error($con);
        }
    } else {
        $result = "O nome de usuário não pode estar vazio.";
    }

    // Fecha a conexão
    $con->close();

    // Retorna a resposta como JSON
    $response = array("result" => $result);
    echo json_encode($response);
}

?>
