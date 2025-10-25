// ======== Produtos de exemplo ========
const produtos = [
  {id: 1, nome: "Batom Vermelho Matte", preco: 49.90, imagem: "assets/img/batom.jpg", descricao: "Batom matte de longa duração"},
  {id: 2, nome: "Base Líquida HD", preco: 79.90, imagem: "assets/img/base.jpg", descricao: "Base de alta cobertura"},
  {id: 3, nome: "Sombra Glitter Rose", preco: 39.90, imagem: "assets/img/sombra.jpg", descricao: "Sombra com brilho perolado"},
  {id: 4, nome: "Máscara de Cílios", preco: 45.90, imagem: "assets/img/mascara.jpg", descricao: "Máscara para volume intenso"},
  {id: 5, nome: "Paleta de Blush", preco: 89.90, imagem: "assets/img/blush.jpg", descricao: "Kit com 4 cores de blush"},
  {id: 6, nome: "Esmalte Vermelho Glamour", preco: 24.90, imagem: "assets/img/esmalte.jpg", descricao: "Esmalte vermelho vibrante de longa duração"},
  {id: 7, nome: "Perfume Floral Sedução", preco: 159.90, imagem: "assets/img/perfume.jpg", descricao: "Fragrância floral sofisticada com notas de jasmim e rosas"}
];

// Carrinho com persistência local
const cart = JSON.parse(localStorage.getItem('cart') || '{}');

// ======== Elementos do DOM ========
const produtosContainer = document.getElementById('produtos');
const cartCount = document.getElementById('cart-count');
const cartTableBody = document.querySelector('#cart-table tbody');
const totalEl = document.getElementById('total');

// Quando o HTML já contém cards estáticos (reorganizado pelo usuário), precisamos
// descobrir os produtos a partir do DOM e conectar os botões existentes ao sistema
function collectProductsFromDOM() {
  // procura imagens dentro das seções de novidades e infere o card ao redor
  const imgs = document.querySelectorAll('.novos-produtos img');
  if (!imgs.length) return;

  let nextId = Math.max(0, ...produtos.map(p => p.id)) + 1;

  imgs.forEach(img => {
    // encontra o 'card' que contém a imagem (procura o ancestral que contém um h3)
    let card = img.closest('div');
    while (card && !card.querySelector('h3')) {
      card = card.parentElement;
    }
    if (!card) return;

    const nomeEl = card.querySelector('h3');
    const nome = nomeEl ? nomeEl.textContent.trim() : null;

    // encontra o div que contém o preço (texto com 'R$')
    const divs = Array.from(card.querySelectorAll('div'));
    const priceDiv = divs.find(d => /R\$/.test(d.textContent));
    let preco = 0;
    if (priceDiv) {
      const txt = priceDiv.textContent.replace(/[R$\s\.]/g, '').replace(',', '.');
      preco = parseFloat(txt) || 0;
    }

    // verifica se já existe um produto com o mesmo nome na lista de exemplo
    let prod = produtos.find(p => p.nome && nome && p.nome.trim() === nome);
    if (!prod) {
      // cria um novo produto na lista (não altera o HTML)
      prod = { id: nextId++, nome: nome || `Produto ${nextId}`, preco: preco, imagem: img.getAttribute('src'), descricao: '' };
      produtos.push(prod);
    }

    // liga o botão do card ao adicionarCarrinho
    const btn = card.querySelector('button');
    if (btn) {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        // se houver um input de quantidade dentro o card, lê seu valor
        const input = card.querySelector('input[type="number"]');
        const qtd = input ? Math.max(1, parseInt(input.value) || 1) : 1;
        adicionarCarrinho(prod.id, qtd);
      });
    }
  });
}

// ======== Renderizar produtos ========
function renderProdutos() {
  produtosContainer.innerHTML = '';
  for (const p of produtos) {
    const artigo = document.createElement('article');
    // Adiciona classe 'novo' para os novos produtos (id > 5)
    artigo.className = `produto ${p.id > 5 ? 'novo' : ''}`;
    artigo.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" 
           onerror="console.error('Erro ao carregar imagem:', this.src)">
      <h3>${p.nome}</h3>
      <p class="descricao">${p.descricao}</p>
      <div class="preco">${p.preco.toFixed(2)}</div>
      <div class="acoes">
        <input type="number" min="1" value="1" id="qtd-${p.id}">
        <button onclick="adicionarCarrinho(${p.id})">
          <i class="fas fa-shopping-cart"></i>
          Adicionar ao carrinho
        </button>
      </div>
    `;
    produtosContainer.appendChild(artigo);
  }
}

// ======== Adicionar ao carrinho ========
function adicionarCarrinho(id, qtdParam) {
  showLoading();
  // permite passar quantidade diretamente (usado ao ligar botões existentes)
  let qtd = typeof qtdParam === 'number' ? qtdParam : null;
  if (qtd === null) {
    const input = document.getElementById(`qtd-${id}`);
    if (input) qtd = Number.parseInt(input.value) || 1;
    else qtd = 1;
  }

  if (cart[id]) cart[id] += qtd;
  else cart[id] = qtd;

  // Persistir no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Atualizar interface
  renderCarrinho();

  // Feedback visual
  const produto = produtos.find(p => p.id === id) || { nome: 'Produto' };
  showToast(`${produto.nome} adicionado ao carrinho! 🛍️`);
  hideLoading();
}

// ======== Remover do carrinho ========
function removerCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  delete cart[id];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCarrinho();
  showToast(`${produto.nome} removido do carrinho`, 'error');
}

// ======== Renderizar carrinho ========
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
  cartCount.textContent = Object.values(cart).reduce((a,b)=>a+b,0);
  // Atualiza contador do carrinho flutuante também
  updateFloatingCart();
}

// ======== Finalizar compra ========
document.getElementById('checkout-btn').addEventListener('click', () => {
  if(Object.keys(cart).length === 0) {
    showToast("Seu carrinho está vazio!", 'error');
    return;
  }
  
  showLoading();
  
  // Simulação de processamento de pagamento
  setTimeout(() => {
    hideLoading();
    showToast("Compra finalizada com sucesso! 🎉");
    
    // Limpar carrinho
    for(let key in cart) delete cart[key];
    localStorage.removeItem('cart');
    renderCarrinho();
    
    // Atualizar interface
    document.getElementById('carrinho').scrollIntoView({ behavior: 'smooth' });
  }, 1500);
});

// ======== Atualizar contador flutuante ========
function updateFloatingCart() {
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.querySelector('.cart-floating .cart-count').textContent = count;
}

// ======== INTEGRAÇÃO COM HTML MODERNO ========
// Conecta todos os botões .btn-adicionar ao sistema de carrinho
function conectarBotoesAdicionar() {
  const botoes = document.querySelectorAll('.btn-adicionar');
  botoes.forEach(btn => {
    btn.addEventListener('click', function(ev) {
      ev.preventDefault();
      // Encontra o card do produto
      const card = btn.closest('.produto-card');
      if (!card) return;
      const nome = card.querySelector('.produto-title')?.textContent?.trim();
      const precoTxt = card.querySelector('.produto-price')?.textContent?.replace(/[R$\s]/g, '').replace(',', '.');
      const preco = precoTxt ? Number.parseFloat(precoTxt) : 0;
      const img = card.querySelector('img')?.getAttribute('src');
      // Busca produto na lista ou cria novo
      let prod = produtos.find(p => p.nome === nome);
      if (!prod) {
        prod = { id: produtos.length+1, nome, preco, imagem: img, descricao: '' };
        produtos.push(prod);
      }
      adicionarCarrinho(prod.id, 1);
    });
  });
}

// Chama integração ao carregar a página
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  conectarBotoesAdicionar();
} else {
  document.addEventListener('DOMContentLoaded', conectarBotoesAdicionar);
}

// ======== Inicializar ========
document.addEventListener('DOMContentLoaded', () => {
  showLoading();
  setTimeout(() => {
    // Se existe container dinâmico, renderiza; caso contrário, conecta os produtos
    if (produtosContainer) {
      renderProdutos();
    } else {
      collectProductsFromDOM();
    }

    renderCarrinho();
    updateFloatingCart();
    hideLoading();
    showToast('Bem-vindo à nossa loja! 💄');
  }, 1000);
});

// ======== LOGIN FORM UX & VALIDATION ========
document.addEventListener('DOMContentLoaded', function() {
  // Procura formulário de login (login.php) por id ou class
  const loginForm = document.querySelector('#login-form') || document.querySelector('.login-form');
  if (!loginForm) return;

  // Colocar foco no primeiro campo útil
  const firstInput = loginForm.querySelector('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
  if (firstInput) firstInput.focus();

  // Validação simples: campos obrigatórios
  loginForm.addEventListener('submit', function(ev) {
    const emailOrUser = loginForm.querySelector('input[name="email"], input[name="usuario"], input[name="user"]');
    const password = loginForm.querySelector('input[type="password"], input[name="senha"]');
    let ok = true;

    if (emailOrUser) {
      emailOrUser.classList.remove('error');
      if (!emailOrUser.value.trim()) { ok = false; emailOrUser.classList.add('error'); }
    }
    if (password) {
      password.classList.remove('error');
      if (!password.value.trim() || password.value.trim().length < 4) { ok = false; password.classList.add('error'); }
    }

    if (!ok) {
      ev.preventDefault();
      showToast('Preencha usuário/e-mail e senha corretamente.', 'error');
      return false;
    }

    // Se chegar aqui, deixa o form submeter normalmente (backend trata autenticação)
    showLoading();
  });
});

// ======== VALIDAÇÃO DO FORMULÁRIO DE PAGAMENTO ========
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[action="checkout.php"]');
  if (!form) return;

  // Cria elemento para mensagem
  let msg = document.createElement('div');
  msg.className = 'form-msg';
  form.appendChild(msg);

  form.addEventListener('submit', function(ev) {
    msg.textContent = '';
    msg.classList.remove('success', 'error');
    let ok = true;
    // Validação simples dos campos
    ['nome', 'email', 'endereco', 'pagamento'].forEach(id => {
      const input = form.querySelector(`[name="${id}"]`);
      if (input) input.classList.remove('error');
      if (!input || !input.value.trim()) {
        ok = false;
        if (input) input.classList.add('error');
      }
    });
    if (!ok) {
      ev.preventDefault();
      msg.textContent = 'Preencha todos os campos corretamente.';
      msg.classList.add('error');
      showToast('Preencha todos os campos!', 'error');
      return false;
    } else {
      msg.textContent = 'Pedido enviado com sucesso!';
      msg.classList.add('success');
      showToast('Pedido enviado! 🛍️', 'success');
    }
  });
});
