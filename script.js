// Array que vai guardar os produtos que o usuário colocar no carrinho
let carrinho = [];

// Lista de banco de dados fictícia dos produtos (deve bater com o HTML)
const produtosDB = [
    { id: 1, nome: "Saca de Milho (60kg)", preco: 85.00 },
    { id: 2, nome: "Adubo NPK (50kg)", preco: 140.00 },
    { id: 3, nome: "Semente de Soja (40kg)", preco: 120.00 }
];

// Função para abrir e fechar a barra lateral do carrinho
function toggleCarrinho() {
    const sidebar = document.getElementById('sidebar-carrinho');
    sidebar.classList.toggle('active');
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(idProduto) {
    // Encontra os dados reais do produto pelo ID
    const produto = produtosDB.find(p => p.id === idProduto);
    
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        // Se já existe, só aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se é novo, adiciona o objeto no array com quantidade 1
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarInterfaceCarrinho();
}

// Função para remover um produto do carrinho
function removerDoCarrinho(idProduto) {
    // Filtra o array para remover o item selecionado
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarInterfaceCarrinho();
}

// Função que atualiza o visual do carrinho, quantidade de itens e o valor total
function atualizarInterfaceCarrinho() {
    const containerItens = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const contadorCart = document.getElementById('cart-count');
    
    // Limpa o container para renderizar do zero
    containerItens.innerHTML = '';
    
    let precoTotal = 0;
    let totalItens = 0;

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            precoTotal += item.preco * item.quantidade;
            totalItens += item.quantidade;

            // Cria o elemento HTML de cada item inserido
            const itemElemento = document.createElement('div');
            itemElemento.classList.add('item-no-carrinho');
            itemElemento.innerHTML = `
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <p>Qtd: ${item.quantidade} x R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
            `;
            containerItens.appendChild(itemElemento);
        });
    }

    // Atualiza o valor total e o contador do topo
    totalCarrinho.innerText = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    contadorCart.innerText = totalItens;
}

// Mensagem ao finalizar a compra
function finalizarCompra() {
    if(carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Pedido realizado com sucesso! Obrigado por comprar na AgroVendas.");
    carrinho = []; // Limpa o carrinho
    atualizarInterfaceCarrinho();
    toggleCarrinho(); // Fecha a barra lateral
}