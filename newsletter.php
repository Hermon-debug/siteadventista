<?php
header('Content-Type: application/json');
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Verificar se o e-mail já existe
        $stmt = $conn->prepare("SELECT id FROM newsletter WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 0) {
            // Inserir novo inscrito
            $stmt = $conn->prepare("INSERT INTO newsletter (email, data_inscricao) VALUES (?, NOW())");
            $stmt->bind_param("s", $email);
            
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Inscrição realizada com sucesso!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao realizar inscrição.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Este e-mail já está inscrito.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'E-mail inválido.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
}

$conn->close();
?>
