// Array que armazenará os celulares adicionados
let carrinho = [];

// Função para adicionar o celular ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Procura se o produto já existe na lista do carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        // Se já existe, só aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se é um produto novo, adiciona o objeto no array
        carrinho.push({ nome: nome, preco: preco, quantidade: 1 });
    }

    // Renderiza o carrinho atualizado na tela
    atualizarInterfaceCarrinho();
}

// Função para remover uma unidade do produto ou tirá-lo do carrinho
function removerDoCarrinho(nome) {
    const index = carrinho.findIndex(item => item.nome === nome);

    if (index !== -1) {
        carrinho[index].quantidade -= 1;
        
        // Se a quantidade chegou a zero, remove completamente da lista
        if (carrinho[index].quantidade === 0) {
            carrinho.splice(index, 1);
        }
    }

    // Redesenha as atualizações na tela
    atualizarInterfaceCarrinho();
}

// Função responsável por calcular totais e montar o HTML do carrinho
function atualizarInterfaceCarrinho() {
    const containerItens = document.getElementById('itens-carrinho');
    const elementoTotal = document.getElementById('valor-total');
    
    // Reseta o conteúdo interno antes de recriar
    containerItens.innerHTML = '';

    // Se estiver vazio, exibe mensagem padrão e zera o valor
    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p style="color: #888; text-align: center;">O carrinho está vazio</p>';
        elementoTotal.innerText = 'R$ 0,00';
        return;
    }

    let valorTotalGeral = 0;

    // Passa por cada item comprado construindo sua linha visual
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        valorTotalGeral += subtotal;

        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                ${item.quantidade}x - R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <button class="btn-remover" onclick="removerDoCarrinho('${item.nome}')">X</button>
        `;
        containerItens.appendChild(divItem);
    });

    // Exibe o preço final formatado em padrão brasileiro (R$)
    elementoTotal.innerText = `R$ ${valorTotalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

// Função acionada pelo botão de concluir a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione algum celular antes de finalizar.');
    } else {
        alert('Pedido finalizado com sucesso! Obrigado por comprar na TechStore.');
        carrinho = []; // Limpa os dados do carrinho
        atualizarInterfaceCarrinho(); // Reseta a tela
    }
}