<?php
require 'conexao.php';

$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

$produtos = [];
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $produtos[] = $row;
  }
}

header('Content-Type: application/json');
echo json_encode($produtos);