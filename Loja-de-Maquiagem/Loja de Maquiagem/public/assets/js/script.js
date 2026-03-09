 (function(){
 // Produtos de exemplo
const produtos = [
  { id: 1, nome: "Batom Vermelho Matte", preco: 49.90, imagem: "imagens/batom.jpg" },
  { id: 2, nome: "Base Líquida HD", preco: 79.90, imagem: "imagens/base.jpg" },
  { id: 3, nome: "Sombra Glitter Rose", preco: 39.90, imagem: "imagens/sombra.jpg" }
];

const cart = {};

const produtosContainer = document.getElementById('produtos');
const cartCount = document.getElementById('cart-count');
const cartTableBody = document.querySelector('#cart-table tbody');
const totalEl = document.getElementById('total');

// Renderiza produtos
function renderProdutos() {
  produtosContainer.innerHTML = '';
  produtos.forEach(p => {
    const artigo = document.createElement('article');
    artigo.className = 'produto';
    artigo.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <div class="preco">R$ ${p.preco.toFixed(2)}</div>
      <div class="acoes">
        <input type="number" min="1" value="1" id="qtd-${p.id}">
        <button onclick="adicionarCarrinho(${p.id})">Adicionar ao carrinho</button>
      </div>
    `;
    produtosContainer.appendChild(artigo);
  });
}

// Adicionar ao carrinho
function adicionarCarrinho(id) {
  const qtd = parseInt(document.getElementById(`qtd-${id}`).value);
  if (cart[id]) cart[id] += qtd;
  else cart[id] = qtd;
  renderCarrinho();
}

// Remover item do carrinho
function removerCarrinho(id) {
  delete cart[id];
  renderCarrinho();
}

// Renderizar carrinho
function renderCarrinho() {
  cartTableBody.innerHTML = '';
  let total = 0;

  Object.keys(cart).forEach(id => {
    const p = produtos.find(prod => prod.id == id);
    const subtotal = cart[id] * p.preco;
    total += subtotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${cart[id]}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td>R$ ${subtotal.toFixed(2)}</td>
      <td><button onclick="removerCarrinho(${id})">Remover</button></td>
    `;
    cartTableBody.appendChild(tr);
  });

  totalEl.textContent = total.toFixed(2);
  cartCount.textContent = Object.values(cart).reduce((a, b) => a + b, 0);
}

// Finalizar compra (somente se o botão existir)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert("Compra finalizada com sucesso! 🎉");
    for (let key in cart) delete cart[key];
    renderCarrinho();
  });
}

// Inicializa (somente se o container de produtos existir)
if (produtosContainer) {
  renderProdutos();
}

renderCarrinho();

})();
