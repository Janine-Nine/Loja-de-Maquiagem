<?php
session_start();
require 'conexao.php';


if (empty($_SESSION['cart'])) {
header('Location: carrinho.php');
exit;
}


// Aqui você faria gravação do pedido em tabela 'pedidos' e subitens. Por simplicidade: limpar o carrinho.
$_SESSION['cart'] = [];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<title>Compra Finalizada</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<h2>Compra finalizada com sucesso! 🎉</h2>
<p>Obrigado pela sua compra. (Este é um exemplo; integre um gateway de pagamento real para produção.)</p>
<a href="index.php">Voltar para a loja</a>
</body>
</html>