const produtosMenu = (typeof produtos !== 'undefined' ? produtos : [
    { nome: 'Arroz doce', barraca: 'Caipira', preco: 12.00 },
    { nome: 'Bolo Caipira', barraca: 'Caipira', preco: 10.00 },
    { nome: 'Canjica', barraca: 'Caipira', preco: 16.00 },
    { nome: 'Cuscuz', barraca: 'Caipira', preco: 16.00 },
    { nome: 'Doce Caipira', barraca: 'Caipira', preco: 3.00 },
    { nome: 'Doce de Abóbora (copo)', barraca: 'Caipira', preco: 12.00 },
    { nome: 'Pinhão', barraca: 'Caipira', preco: 20.00 },
    { nome: 'Quentão', barraca: 'Caipira', preco: 12.00 },
    { nome: 'Vinho Quente', barraca: 'Caipira', preco: 14.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Caipira', preco: 2.00 },
    { nome: 'Alheira (porção)', barraca: 'Portuguesa', preco: 30.00 },
    { nome: 'Linguiça Portuguesa (porção)', barraca: 'Portuguesa', preco: 30.00 },
    { nome: 'Caldo Verde', barraca: 'Portuguesa', preco: 18.00 },
    { nome: 'Doce Português', barraca: 'Portuguesa', preco: 15.00 },
    { nome: 'Vinho (copo)', barraca: 'Portuguesa', preco: 15.00 },
    { nome: 'Bolinho de Bacalhau', barraca: 'Portuguesa', preco: 14.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Portuguesa', preco: 2.00 },
    { nome: 'Caldo de Feijão', barraca: 'Mineira', preco: 15.00 },
    { nome: 'Caldo de Mandioca', barraca: 'Mineira', preco: 15.00 },
    { nome: 'Curau', barraca: 'Mineira', preco: 16.00 },
    { nome: 'Milho', barraca: 'Mineira', preco: 13.00 },
    { nome: 'Pamonha', barraca: 'Mineira', preco: 16.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Mineira', preco: 2.00 },
    { nome: 'Lanche de Pernil no Pão Francês', barraca: 'Mineira', preco: 24.00 },
    { nome: 'Fogazza Queijo ou Calabresa', barraca: 'Fogazza', preco: 24.00 },
    { nome: 'Pizza Queijo ou Calabresa', barraca: 'Pizza', preco: 17.00 },
    { nome: 'Água Mineral c/ gás', barraca: 'Bar', preco: 7.00 },
    { nome: 'Água Mineral s/ gás', barraca: 'Bar', preco: 6.00 },
    { nome: 'Cerveja Heineken (lata)', barraca: 'Bar', preco: 10.00 },
    { nome: 'Cerveja Amstel (lata)', barraca: 'Bar', preco: 8.00 },
    { nome: 'H2O', barraca: 'Bar', preco: 10.00 },
    { nome: 'Refrigerante (lata)', barraca: 'Bar', preco: 8.00 },
    { nome: 'Suco (lata)', barraca: 'Bar', preco: 8.00 },
    { nome: 'Bomba, Canolli', barraca: 'Doces', preco: 22.00 },
    { nome: 'Torta Limão e Morango', barraca: 'Doces', preco: 20.00 },
    { nome: 'Brigadeiro/Pão de Mel/Brownie', barraca: 'Doces', preco: 13.00 },
    { nome: 'Trufa e Alfajor', barraca: 'Doces', preco: 8.00 },
    { nome: 'Bolo de Pote e de Abacaxi (pedaço)', barraca: 'Doces', preco: 18.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Doces', preco: 2.00 },
    { nome: 'Churrasco no Espeto', barraca: 'Churrasco', preco: 13.00 },
    { nome: 'Churrasco no Pão c/ Vinagrete', barraca: 'Churrasco', preco: 16.00 },
    { nome: 'Linguiça no Espeto', barraca: 'Churrasco', preco: 13.00 },
    { nome: 'Linguiça no Pão c/ Vinagrete', barraca: 'Churrasco', preco: 16.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Churrasco', preco: 2.00 },
    { nome: 'Choco Fruit', barraca: 'Frutas', preco: 20.00 },
    { nome: 'Maçã do Amor', barraca: 'Frutas', preco: 12.00 },
    { nome: 'Salada de frutas', barraca: 'Frutas', preco: 9.00 },
    { nome: 'Suco de frutas', barraca: 'Frutas', preco: 12.00 },
    { nome: 'Choco maçã', barraca: 'Frutas', preco: 14.00 },
    { nome: 'Salada de Frutas com chocolate', barraca: 'Frutas', preco: 14.00 },
    { nome: 'Crepe', barraca: 'Crepe', preco: 13.00 },
    { nome: 'Algodão doce', barraca: 'Crepe', preco: 10.00 },
    { nome: 'Macarrão Molho Bolonhesa', barraca: 'Cantina', preco: 28.00 },
    { nome: 'Macarrão Molho Carnonara', barraca: 'Cantina', preco: 28.00 },
    { nome: 'Macarrão Molho Sugo', barraca: 'Cantina', preco: 23.00 },
    { nome: 'Macarrão Molho Pesto', barraca: 'Cantina', preco: 28.00 },
    { nome: 'Porção de Queijo Ralado', barraca: 'Cantina', preco: 3.00 },
    { nome: 'Vinho (garrafa)', barraca: 'Cantina', preco: 52.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Cantina', preco: 2.00 },
    { nome: 'Pescaria', barraca: 'Brincadeira', preco: 10.00 },
    { nome: 'Bingo (1 cartela)', barraca: 'Bingo', preco: 12.00 },
    { nome: 'Bingo (2 cartela)', barraca: 'Bingo', preco: 22.00 }
]);
const menuPorBarracaPrintEl = document.getElementById('menuPorBarracaPrint');
const btnImprimirMenu = document.getElementById('btnImprimirMenu');

function formatarBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarMenuPorBarraca() {
    if (!menuPorBarracaPrintEl) {
        return;
    }

    const produtosAgrupados = produtosMenu.reduce((acc, produto) => {
        if (!acc[produto.barraca]) {
            acc[produto.barraca] = [];
        }

        acc[produto.barraca].push(produto);
        return acc;
    }, {});

    const ordemBarracas = Object.keys(produtosAgrupados).sort((a, b) => {
        const totalA = produtosAgrupados[a].length;
        const totalB = produtosAgrupados[b].length;

        if (totalA !== totalB) {
            return totalB - totalA;
        }

        return a.localeCompare(b, 'pt-BR');
    });
    menuPorBarracaPrintEl.innerHTML = '';

    ordemBarracas.forEach((barraca) => {
        const card = document.createElement('article');
        card.className = 'menu-barraca-card';

        const titulo = document.createElement('h4');
        titulo.textContent = barraca;
        card.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.className = 'menu-items';

        produtosAgrupados[barraca]
            .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
            .forEach((produto) => {
                const item = document.createElement('li');

                const nome = document.createElement('span');
                nome.className = 'menu-item-nome';
                nome.textContent = produto.nome;

                const preco = document.createElement('span');
                preco.className = 'menu-item-preco';
                preco.textContent = formatarBRL(produto.preco);

                item.appendChild(nome);
                item.appendChild(preco);
                lista.appendChild(item);
            });

        card.appendChild(lista);
        menuPorBarracaPrintEl.appendChild(card);
    });
}

if (btnImprimirMenu) {
    btnImprimirMenu.addEventListener('click', () => {
        window.print();
    });
}

renderizarMenuPorBarraca();
