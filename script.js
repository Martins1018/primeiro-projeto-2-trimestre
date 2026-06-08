// Array para armazenar os itens que o usuário escolhe
let carrinho = [];

// Função para abrir e fechar a barra lateral do carrinho
function toggleCarrinho() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

// Função para colocar produtos dentro do carrinho
function adicionarAoCarrinho(nome, preco) {
    // Adiciona o item ao array de controle
    carrinho.push({ nome, preco });
    
    // Atualiza a visualização na página
    atualizarInterfaceCarrinho();
    
    // Abre automaticamente a barra para dar feedback ao usuário
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
    }
}

// Função para reconstruir a lista visual do carrinho e recalcular o total
function atualizarInterfaceCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Atualiza o contador de bolinha vermelha no ícone superior
    cartCount.innerText = carrinho.length;
    
    // Se estiver vazio, exibe a mensagem padrão
    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }
    
    // Limpa os itens antigos para gerar a lista atualizada
    cartItemsContainer.innerHTML = '';
    let somaTotal = 0;
    
    // Varre o array de itens gerando os códigos de exibição
    carrinho.forEach((item, index) => {
        s