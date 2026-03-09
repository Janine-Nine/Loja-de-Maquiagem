<?php
session_start();
require 'conexao.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$id = intval($_POST['id']);
$qtd = max(1, intval($_POST['qtd']));


// verificar se produto existe e estoque
$stmt = $conn->prepare("SELECT estoque FROM produtos WHERE id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();
if ($row = $res->fetch_assoc()) {
$estoque = intval($row['estoque']);
if ($qtd > $estoque) $qtd = $estoque;


if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];
if (isset($_SESSION['cart'][$id])) {
$_SESSION['cart'][$id] += $qtd;
} else {
$_SESSION['cart'][$id] = $qtd;
}
}
}


header('Location: index.php');
exit;