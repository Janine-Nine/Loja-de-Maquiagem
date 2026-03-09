💄 Makeup Store – Full Stack E-commerce

A modern web-based e-commerce application for cosmetics products built using PHP, JavaScript, Bootstrap, and MySQL.

The project simulates a real online store with product catalog, shopping cart, authentication system and checkout flow.

Designed as a learning project for full stack development, focusing on frontend UI, backend logic, and basic e-commerce architecture.

🧭 Project Overview

This application provides a simplified online store experience where users can:

• Browse cosmetic products
• Add items to the shopping cart
• Update quantities dynamically
• Remove items from the cart
• Authenticate via login system
• Complete a checkout form

The project demonstrates how frontend interaction and backend processing work together in a real application scenario.

🧱 Architecture

The project follows a structured MVC-like organization, separating logic, assets, and configuration.

loja-de-maquiagem
│
├── app
│   └── controllers
│       ├── adicionar_carrinho.php
│       ├── carrinho.php
│       ├── checkout.php
│       ├── login.php
│       ├── logout.php
│       ├── register.php
│       ├── produtos.php
│       └── remover_carrinho.php
│
├── config
│   └── database
│       └── database.php
│
├── public
│   └── assets
│       ├── css
│       │   ├── bootstrap.min.css
│       │   └── style.css
│       │
│       ├── img
│       └── js
│           └── script.js
│
├── docker
│   └── docker-compose.yml
│
├── index.php
└── README.md

This structure improves maintainability and scalability, even for a small learning project.

🛠️ Technology Stack
Frontend

HTML5

CSS3

Bootstrap 5

JavaScript (Vanilla JS)

Key UI features:

• responsive layout
• product cards
• cart interface
• modal authentication
• toast notifications

Backend

PHP

Responsibilities handled by backend:

• cart operations
• checkout processing
• login / logout logic
• user registration

Database

MySQL

Database used to manage:

• users
• products
• orders

DevOps

Docker

Git

GitHub

Docker allows the project to run in an isolated environment.

🛒 Core Features
Product Catalog

The store provides a simple catalog including:

Lipstick

Foundation

Eyeshadow

Perfume

Nail polish

Mascara

Each product contains:

• image
• description
• price
• add-to-cart action

🧺 Shopping Cart System

The cart is implemented using JavaScript dynamic DOM manipulation.

Capabilities:

• add product
• update quantity
• remove item
• calculate subtotal
• calculate total automatically

This mimics the behavior of real e-commerce platforms.

💳 Checkout Flow

The checkout form collects customer information:

Full name

Email

Address

Payment method

Supported payment options:

• Credit Card
• PIX
• Boleto

Data is submitted to:

checkout.php

Where the order logic would normally be processed.

🔐 Authentication

Basic authentication system implemented with:

login.php
register.php
logout.php

Users can:

• create an account
• log in
• log out

🎨 UI Design

The interface was designed to be modern and visually appealing, using a cosmetic brand aesthetic.

Design elements include:

• pink gradient theme
• modern product cards
• clean typography (Poppins)
• responsive layout

The UI is optimized for:

desktop

tablet

mobile

⚙️ Running the Project
Clone repository
git clone https://github.com/your-username/loja-de-maquiagem.git

---

🧠 What This Project Demonstrates

This project demonstrates practical skills such as:

• structuring a web project
• integrating frontend and backend logic
• building interactive UI components
• implementing cart functionality
• handling user authentication

It serves as a portfolio project for junior web developers learning full stack fundamentals.

---

🚀 Possible Future Improvements

Potential enhancements include:

• payment gateway integration (Stripe / MercadoPago)
• admin dashboard
• product management panel
• inventory control
• order history
• password hashing and security improvements
• REST API version of the backend

---

👩‍💻 Author

Janine

Technology student focused on:

Web Development

Backend Engineering

Database Design

Full Stack Applications

Currently seeking opportunities as:

• Junior Developer
• Software Development Intern

---

📄 License

This project is intended for educational and portfolio purposes.
