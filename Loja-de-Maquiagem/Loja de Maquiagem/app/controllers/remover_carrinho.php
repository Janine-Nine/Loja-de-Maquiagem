<?php
session_start();
if (isset($_GET['id']) && isset($_SESSION['cart'])) {
$id = intval($_GET['id']);
if (isset($_SESSION['cart'][$id])) {
unset($_SESSION['cart'][$id]);
}
}
header('Location: carrinho.php');
exit;