<?php
$servername = "db";
$username = "janine";
$password = "12345";
$dbname = "loja";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");