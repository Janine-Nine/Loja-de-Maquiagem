CREATE DATABASE IF NOT EXISTS loja;
USE loja;


CREATE TABLE IF NOT EXISTS usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
is_admin TINYINT(1) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS produtos (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
descricao TEXT,
preco DECIMAL(10,2) NOT NULL,
imagem VARCHAR(255) DEFAULT NULL,
estoque INT DEFAULT 0,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insere um admin e alguns produtos de exemplo
INSERT INTO usuarios (nome, email, senha, is_admin) VALUES
('Admin','admin@loja.local', '" . md5("admin123") . "', 1);


INSERT INTO produtos (nome, descricao, preco, imagem, estoque) VALUES
('Batom Vermelho Matte','Textura aveludada e alta fixação',49.90,'batom.jpg',10),
('Base Líquida HD','Cobertura leve e acabamento natural',79.90,'base.jpg',15),
('Sombra Glitter Rose','Brilho intenso e fácil aplicação',39.90,'sombra.jpg',20);

