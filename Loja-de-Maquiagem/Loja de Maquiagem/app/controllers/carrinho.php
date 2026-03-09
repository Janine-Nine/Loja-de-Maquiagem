<?php
session_start();
require 'conexao.php';


$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$produtos = [];
$total = 0;


if ($cart) {
$ids = implode(',', array_map('intval', array_keys($cart)));
$sql = "SELECT * FROM produtos WHERE id IN ($ids)";
$res = $conn->query($sql);
while($row = $res->fetch_assoc()) {
$row['qtd'] = $cart[$row['id']];
$row['subtotal'] = $row['qtd'] * $row['preco'];
$total += $row['subtotal'];
$produtos[] = $row;
}
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<title>Carrinho - Loja</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="index.php">← Voltar</a>
<h2>Seu Carrinho</h2>
<?php if (empty($produtos)) : ?>
<p>Seu carrinho está vazio.</p>
<?php else: ?>
<table>
<thead><tr><th>Produto</th><th>Qtd</th><th>Preço</th><th>Subtotal</th><th></th></tr></thead>
<tbody>
<?php foreach($produtos as $p): ?>
<tr>
<td><?php echo htmlspecialchars($p['nome']); ?></td>
<td><?php echo $p['qtd']; ?></td>
<td>R$ <?php echo number_format($p['preco'],2,',','.'); ?></td>
<td>R$ <?php echo number_format($p['subtotal'],2,',','.'); ?></td>
<td><a href="remover_carrinho.php?id=<?php echo $p['id']; ?>">Remover</a></td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
<h3>Total: R$ <?php echo number_format($total,2,',','.'); ?></h3>
<a href="checkout.php">Finalizar Compra</a>
<?php endif; ?>
</body>
</html>