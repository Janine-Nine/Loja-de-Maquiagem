<?php
session_start();
require 'conexao.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $senha = $_POST['senha'];

    if (!$email || empty($senha)) {
        $erro = 'Preencha email e senha corretamente.';
    } else {
        $stmt = $conn->prepare("SELECT id, nome, email, senha, is_admin FROM usuarios WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($user = $res->fetch_assoc()) {
            if (password_verify($senha, $user['senha'])) {
                // Login bem-sucedido
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'nome' => $user['nome'],
                    'email' => $user['email'],
                    'is_admin' => $user['is_admin']
                ];

                // Redireciona para painel se admin
                if ($user['is_admin'] == 1) {
                    header('Location: admin/painel.php');
                } else {
                    header('Location: index.php');
                }
                exit;
            } else {
                $erro = 'Senha incorreta.';
            }
        } else {
            $erro = 'Email não encontrado.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Login - Loja de Maquiagem</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <a href="index.php">← Voltar</a>
    <h2>Entrar na Conta</h2>

    <?php if($erro) echo "<p class='erro'>".htmlspecialchars($erro)."</p>"; ?>

    <form method="post">
        <label>Email<br><input type="email" name="email" required></label><br>
        <label>Senha<br><input type="password" name="senha" required></label><br>
        <button type="submit">Entrar</button>
    </form>

    <p>Não tem conta? <a href="register.php">Crie aqui</a></p>
</body>
</html>
