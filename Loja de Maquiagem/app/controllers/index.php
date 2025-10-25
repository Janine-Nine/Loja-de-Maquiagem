<?php
session_start();
require 'conexao.php';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>✨ Loja de Maquiagem</title>

  <!-- Bootstrap -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRUYyN6O/zpVb5c5e0p6Yk6zY4xW/nO9eztR+eoM4pV7bZ5P"
    crossorigin="anonymous"
  >
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-light">

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.php">💋 Loja de Maquiagem</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="carrinho.php">🛒 Carrinho (<?php echo isset($_SESSION['cart']) ? array_sum($_SESSION['cart']) : 0; ?>)</a></li>

          <?php if(isset($_SESSION['user'])): ?>
            <li class="nav-item"><a class="nav-link disabled">Olá, <?php echo htmlspecialchars($_SESSION['user']['nome']); ?></a></li>
            <li class="nav-item"><a class="nav-link text-danger" href="logout.php">Sair</a></li>
          <?php else: ?>
            <li class="nav-item"><a class="nav-link" href="login.php">Entrar</a></li>
            <li class="nav-item"><a class="nav-link" href="register.php">Criar Conta</a></li>
          <?php endif; ?>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Conteúdo principal -->
  <div class="container py-5">
    <h1 class="text-center mb-4">Nossos Produtos 💄</h1>

    <div class="row g-4">
      <?php
      $sql = "SELECT * FROM produtos";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $img = 'imagens/' . ($row['imagem'] ?: 'placeholder.png');
      ?>
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="<?php echo $img; ?>" class="card-img-top" alt="<?php echo htmlspecialchars($row['nome']); ?>">
              <div class="card-body">
                <h5 class="card-title"><?php echo htmlspecialchars($row['nome']); ?></h5>
                <p class="card-text text-muted"><?php echo htmlspecialchars($row['descricao']); ?></p>
                <p class="fw-bold text-primary fs-5">R$ <?php echo number_format($row['preco'], 2, ',', '.'); ?></p>
                <form method="post" action="adicionar_carrinho.php" class="d-flex align-items-center gap-2">
                  <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                  <input type="number" name="qtd" value="1" min="1" max="<?php echo $row['estoque']; ?>" class="form-control w-25">
                  <button type="submit" class="btn btn-dark w-100">Adicionar 🛍️</button>
                </form>
              </div>
            </div>
          </div>
      <?php
        }
      } else {
        echo "<p class='text-center text-muted'>Nenhum produto disponível no momento.</p>";
      }
      ?>
    </div>
  </div>

  <!-- Rodapé -->
  <footer class="bg-dark text-white text-center py-3 mt-5">
    <p class="mb-0">© 2025 Loja de Maquiagem - Todos os direitos reservados 💋</p>
  </footer>

  <!-- Bootstrap JS -->
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ENjdO4Dr2bkBIFxQpeoBxVZ3G5Up5r9j7l5HmqDbM+o7F4U6UwHZdJ6M5q5Y0M8N"
    crossorigin="anonymous"
  ></script>
</body>
</html>
