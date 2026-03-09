<?php
session_start();
require 'conexao.php';

// Pegar a ação via GET (ex: app.php?a=login)
$acao = isset($_GET['a']) ? $_GET['a'] : 'home';

switch ($acao) {

    case 'login':
        include 'login.php';
        break;

    case 'logout':
        include 'logout.php';
        break;

    case 'register':
        include 'register.php';
        break;

    case 'produtos':
        include 'produtos.php';
        break;

    case 'produto':
        include 'produto.php';
        break;

    case 'carrinho':
        include 'carrinho.php';
        break;

    case 'adicionar_carrinho':
        include 'adicionar_carrinho.php';
        break;

    case 'remover_carrinho':
        include 'remover_carrinho.php';
        break;

    case 'checkout':
        include 'checkout.php';
        break;

    case 'admin_painel':
        if (isset($_SESSION['user']) && $_SESSION['user']['is_admin'] == 1) {
            include 'admin/painel.php';
        } else {
            header('Location: app.php?a=login');
            exit;
        }
        break;

    case 'admin_novo_produto':
        if (isset($_SESSION['user']) && $_SESSION['user']['is_admin'] == 1) {
            include 'admin/novo_produto.php';
        } else {
            header('Location: app.php?a=login');
            exit;
        }
        break;

    case 'home':
    default:
        include 'index.php';
        break;
}
