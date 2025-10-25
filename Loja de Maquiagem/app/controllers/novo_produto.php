<?php
session_start();
require '../conexao.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
    header('Location: ../index.php');
    exit;
}

$erro = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $descricao = trim($_POST['descricao']);
    $preco = floatval($_POST['preco']);
    $estoque = intval($_POST['estoque']);

    $imagem = '';
    if (!empty($_FILES['imagem']['name'])) {
        $ext = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
        $imagem = uniqid() . '.' . $ext;
        move_uploaded_file($_FILES['imagem']['tmp_name'], '../imagens/' . $imagem);
    }

    $stmt = $conn->prepare("INSERT INTO produtos (nome, descricao, preco, estoque, imagem) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('ssdiss', $nome, $descricao, $preco, $estoque, $imagem);
    if ($stmt->execute()) {
        header('Location: painel.php');
        exit;
    } else {
        $erro = "Erro ao adicionar produto.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Novo Produto</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <h2>Adicionar Novo Produto</h2>
  <?php if($erro) echo "<p class='erro'>$erro</p>"; ?>
  <form method="post" enctype="multipart/form-data">
    <label>Nome<br><input type="text" name="nome" required></label><br>
    <label>Descrição<br><textarea name="descricao" required></textarea></label><br>
    <label>Preço<br><input type="number" name="preco" step="0.01" required></label><br>
    <label>Estoque<br><input type="number" name="estoque" required></label><br>
    <label>Imagem<br><input type="file" name="imagem"></label><br>
    <button type="submit">Adicionar Produto</button>
  </form>
  <a href="painel.php">← Voltar</a>
</body>
</html>