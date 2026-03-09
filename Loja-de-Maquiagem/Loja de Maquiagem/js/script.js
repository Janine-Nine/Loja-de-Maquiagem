// Array de produtos exemplo
const produtos = [
    {
        id: 1,
        nome: 'Base Líquida Ultra Coverage',
        descricao: 'Cobertura de longa duração com acabamento matte',
        preco: 89.90,
        imagem: '../img/produto1.jpg'
    },
    {
        id: 2,
        nome: 'Paleta de Sombras Professional',
        descricao: '18 cores altamente pigmentadas',
        preco: 129.90,
        imagem: '../img/produto2.jpg'
    },
    {
        id: 3,
        nome: 'Batom Matte Longa Duração',
        descricao: 'Duração de até 12 horas',
        preco: 45.90,
        imagem: '../img/produto3.jpg'
    }
];

// Carrinho de compras
let carrinho = [];
const FRETE_PADRAO = 15.90;

// Função para formatar preço
function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

// Função para atualizar quantidade do produto
function atualizarQuantidadeProduto(id, alteracao) {
    const input = document.querySelector(`#quantidade-${id}`);
    let quantidade = parseInt(input.value);
    quantidade = Math.max(1, quantidade + alteracao);
    input.value = quantidade;
}

// Função para atualizar resumo do carrinho
function atualizarResumoCarrinho() {
    const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const frete = carrinho.length > 0 ? FRETE_PADRAO : 0;
    const total = subtotal + frete;

    document.getElementById('subtotalCarrinho').textContent = formatarPreco(subtotal);
    document.getElementById('freteCarrinho').textContent = formatarPreco(frete);
    document.getElementById('totalCarrinho').textContent = formatarPreco(total);
}

// Função para atualizar tabela do carrinho
function atualizarTabelaCarrinho() {
    const tbody = document.getElementById('carrinhoItens');
    tbody.innerHTML = carrinho.map(item => `
        <tr>
            <td>
                <div class="produto-info">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <span class="produto-titulo">${item.nome}</span>
                </div>
            </td>
            <td>
                <input type="number" class="quantidade" value="${item.quantidade}" 
                       min="1" onchange="atualizarQuantidade(${item.id}, this.value)">
            </td>
            <td class="text-end">R$ ${formatarPreco(item.preco)}</td>
            <td class="text-end">R$ ${formatarPreco(item.preco * item.quantidade)}</td>
            <td class="text-center">
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    atualizarResumoCarrinho();
}

// Função para atualizar quantidade
function atualizarQuantidade(id, novaQuantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = Math.max(1, parseInt(novaQuantidade));
        atualizarTabelaCarrinho();
    }
}

// Função para remover item do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarContadorCarrinho();
    atualizarTabelaCarrinho();
}

// Função para renderizar produtos
function renderizarProdutos() {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = produtos.map(produto => `
        <article class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
            <div class="produto-info">
                <h3 class="produto-titulo">${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="produto-preco">R$ ${formatarPreco(produto.preco)}</div>
                <div class="produto-acoes">
                    <div class="quantidade-container">
                        <button class="quantidade-btn" onclick="atualizarQuantidadeProduto(${produto.id}, -1)">-</button>
                        <input type="number" id="quantidade-${produto.id}" class="quantidade-input" value="1" min="1">
                        <button class="quantidade-btn" onclick="atualizarQuantidadeProduto(${produto.id}, 1)">+</button>
                    </div>
                    <button class="btn-adicionar-carrinho" onclick="adicionarAoCarrinho(${produto.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Adicionar
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        const itemExistente = carrinho.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({...produto, quantidade: 1});
        }
        atualizarContadorCarrinho();
        atualizarTabelaCarrinho();
        
        // Adicionar animação de feedback
        const btn = event.target;
        btn.innerHTML = 'Adicionado!';
        btn.style.backgroundColor = 'var(--accent-color)';
        setTimeout(() => {
            btn.innerHTML = 'Adicionar ao Carrinho';
            btn.style.backgroundColor = 'var(--primary-color)';
        }, 1000);

        // Abrir modal do carrinho
        const carrinhoModal = new bootstrap.Modal(document.getElementById('carrinhoModal'));
        carrinhoModal.show();
    }
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.querySelector('.cart-count');
    contador.textContent = carrinho.length;
    // Adicionar animação de atualização
    contador.style.transform = 'scale(1.2)';
    setTimeout(() => contador.style.transform = 'scale(1)', 200);
}

// Função para finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    alert('Compra finalizada com sucesso! Redirecionando para o pagamento...');
    // Aqui você pode adicionar a lógica de checkout
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    
    // Configurar botão de finalizar compra
    document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);
    
    // Configurar clique no ícone do carrinho
    document.querySelector('.cart-container').addEventListener('click', () => {
        const carrinhoModal = new bootstrap.Modal(document.getElementById('carrinhoModal'));
        carrinhoModal.show();
    });
});

// Adicionar efeito de parallax no banner
window.addEventListener('scroll', () => {
    const banner = document.querySelector('.banner');
    const scrolled = window.pageYOffset;
    banner.style.transform = `translateY(${scrolled * 0.5}px)`;
});