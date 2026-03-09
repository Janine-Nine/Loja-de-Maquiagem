<?php
session_start();
require '../conexao.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
    header('Location: ../index.php');
    exit;
}

$sql = "SELECT * FROM produtos ORDER BY id DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Painel Admin</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <h1>Painel do Administrador</h1>
  <a href="novo_produto.php">➕ Adicionar Produto</a>
  <table border="1" cellpadding="5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Estoque</th>
      </tr>
    </thead>
    <tbody>
      <?php while($row = $result->fetch_assoc()): ?>
        <tr>
          <td><?= $row['id'] ?></td>
          <td><?= htmlspecialchars($row['nome']) ?></td>
          <td>R$ <?= number_format($row['preco'],2,',','.') ?></td>
          <td><?= $row['estoque'] ?></td>
        </tr>
      <?php endwhile; ?>
    </tbody>
  </table>
</body>
</html>