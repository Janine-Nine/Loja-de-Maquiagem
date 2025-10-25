<?php
session_start();
require 'conexao.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $senha = $_POST['senha'];

    if (!$email) {
        $erro = 'Email inválido.';
    } elseif (strlen($senha) < 6) {
        $erro = 'Senha precisa ter ao menos 6 caracteres.';
    } else {
        $hash = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $nome, $email, $hash);

        if ($stmt->execute()) {
            // Criar sessão do usuário
            $_SESSION['user'] = [
                'nome' => $nome,
                'email' => $email,
                'is_admin' => 0
            ];
            header('Location: index.php');
            exit;
        } else {
            $erro = 'Erro ao cadastrar: email já pode estar em uso.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Criar Conta - Loja de Maquiagem</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <a href="index.php">← Voltar</a>
    <h2>Criar Conta</h2>

    <?php if($erro) echo "<p class='erro'>".htmlspecialchars($erro)."</p>"; ?>

    <form method="post">
        <label>Nome<br><input type="text" name="nome" required></label><br>
        <label>Email<br><input type="email" name="email" required></label><br>
        <label>Senha<br><input type="password" name="senha" required></label><br>
        <button type="submit">Cadastrar</button>
    </form>

    <p>Já tem conta? <a href="login.php">Entre aqui</a></p>
</body>
</html>
