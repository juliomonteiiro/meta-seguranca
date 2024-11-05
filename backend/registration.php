<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Conexão com o banco de dados
$con = new mysqli("localhost", "root", "", "meta-seguranca");

if (mysqli_connect_error()) {
    echo json_encode(["result" => mysqli_connect_error()]);
    exit();
} 

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

// Coletando dados do formulário
$user = $dData['user'] ?? '';
$email = $dData['email'] ?? '';
$pass = $dData['pass'] ?? '';
$cpf = $dData['cpf'] ?? '';  
$phone = $dData['phone'] ?? '';
$birthdate = $dData['birthdate'] ?? '';

$result = "";        

// Função para validar CPF (apenas números)
function validateCpf($cpf) {
    return preg_match('/^\d{11}$/', $cpf);
}

// Função para validar telefone (apenas números)
function validatePhone($phone) {
    return preg_match('/^\(\d{2}\) \d{5}-\d{4}$/', $phone) || preg_match('/^\(\d{2}\) \d{4}-\d{4}$/', $phone);
}

// Função para validar a idade (maior de 18 anos)
function isOfLegalAge($birthdate) {
    $age = (new DateTime())->diff(new DateTime($birthdate))->y;
    return $age >= 18;
}

// Verificações
if ($user !== "" && $email !== "" && $pass !== "" && $cpf !== "" && $phone !== "" && $birthdate !== "") {
        $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

        // Inserindo no banco de dados
        $sql = "INSERT INTO usuarios(nome, email, senha, cpf, telefone, data_nasc) VALUES('$user', '$email', '$hashedPassword', '$cpf', '$phone', '$birthdate')";
        $res =mysqli_query($con, $sql);

        
        if ($res) {
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


?>
 