const GA_MEASUREMENT_ID = 'G-0E764T45YL';
const COOKIE_CONSENT_KEY = 'consentimento_cookies_analytics';
const produtos = [
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
    { nome: 'Vinho (garrafa)', barraca: 'Cantina', preco: 52.00 },
    { nome: 'Embalagem p/ Viagem', barraca: 'Cantina', preco: 2.00 },
    { nome: 'Pescaria', barraca: 'Brincadeira', preco: 10.00 },
    { nome: 'Bingo (1 cartela)', barraca: 'Bingo', preco: 12.00 },
    { nome: 'Bingo (2 cartela)', barraca: 'Bingo', preco: 22.00 }
];

const produtosGrid = document.getElementById('produtosGrid');
const produtosScrollWrapperEl = document.getElementById('produtosScrollWrapper');
const produtosScrollBoxEl = document.getElementById('produtosScrollBox');
const produtosScrollHintEl = document.getElementById('produtosScrollHint');
const buscaProdutoEl = document.getElementById('buscaProduto');
const semResultadoBuscaEl = document.getElementById('semResultadoBusca');
const btnLimpar = document.getElementById('btnLimpar');
const tabelaItens = document.getElementById('itensCarrinho');
const totalEl = document.getElementById('total');
const calculadoraBtn = document.getElementById('calculadoraBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const footerEl = document.querySelector('footer');
const menuPorBarracaEl = document.getElementById('menuPorBarraca');
const patrocinadoresAbaEl = document.getElementById('patrocinadoresAba');
const patrocinadoresRodapeEl = document.getElementById('patrocinadoresRodape');
const apoioRodapeEl = document.getElementById('apoioRodape');
const btnAbrirMapa = document.getElementById('btnAbrirMapa');
const mapModal = document.getElementById('mapModal');
const btnFecharMapa = document.getElementById('btnFecharMapa');
const mapModalImage = document.getElementById('mapModalImage');
const cookieBannerEl = document.getElementById('cookieBanner');
const btnAceitarCookiesEl = document.getElementById('btnAceitarCookies');
const btnRecusarCookiesEl = document.getElementById('btnRecusarCookies');
let debounceBuscaTimer = null;
let ultimoTermoBuscaEnviado = '';
let ultimaListaProdutosEnviada = '';
let analyticsPermitido = false;
let gtagInicializado = false;

const itens = [];
const patrocinadores = [
    { nome: 'Luga Brindes Promocionais', arquivo: 'patrocinadores/logotipo-luga.png' },
    { nome: 'Roni Queijos', arquivo: 'patrocinadores/roniqueijos.jpg' },
    { nome: 'Mencarini Carnes', arquivo: 'patrocinadores/mencarini-carnes.png' },
    { nome: 'Pieroni Ambiental', arquivo: 'patrocinadores/pieroni-ambiental.png' },
    { nome: 'Christino é Filhos Ltda', arquivo: 'patrocinadores/cristiano-filhos-logo.png' },
    { nome: 'Prevent Senior', arquivo: 'patrocinadores/prevent-senior-min.png' },
    { nome: 'Mercadão', arquivo: 'patrocinadores/mercadao.png' },
    { nome: 'Unival Valvulas e Conexões', arquivo: 'patrocinadores/logo-unival.svg' },
    { nome: 'Bar Quintal da Mooca', arquivo: 'patrocinadores/barquintaldamooca.jpg' },
    { nome: 'HCI Group', arquivo: 'patrocinadores/hcigroup-logo.svg' },
    { nome: 'Padaria Monte Libano', arquivo: 'patrocinadores/padaria-monte-libano.avif' },
    { nome: 'Padaria Estoril', arquivo: 'patrocinadores/padaria-estoril.avif' },
    { nome: 'Grupo MG Sucatas Siderugica', arquivo: 'patrocinadores/grupo-mg-sucatas.jpg' },
    { nome: 'Lorsa Jeans', arquivo: 'patrocinadores/logo_lorsa.avif' },
    { nome: 'Mané Burguer', arquivo: 'patrocinadores/logo-topo-mane-burger.png.webp' },
    { nome: 'KNGK SERVICOS LOGISTICA', arquivo: 'patrocinadores/kngk-log-logo.jpg' },
    { nome: 'Clinica Satus Nutrição e Estetica', arquivo: 'patrocinadores/status-saude.jpeg' },
    { nome: 'Bar do Verdadeiro ', arquivo: 'patrocinadores/bar-do-verdadeiro-logo.png' },
    { nome: 'anuncie sua marca aqui', arquivo: 'patrocinadores/anuncie_aqui.png' },
];

const apoiadores = [
    { nome: 'Padres Barnabitas', arquivo: 'apoio/barnabitas.png' },
    { nome: 'Policia Militar', arquivo: 'apoio/policialmilitar.png' },
    { nome: 'Prefeitura de Sao Paulo', arquivo: 'apoio/prefeiturasaopaulo.png' },
];

function formatarBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function inicializarGoogleAnalyticsSeNecessario() {
    if (gtagInicializado) {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    const scriptGA = document.createElement('script');
    scriptGA.async = true;
    scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(scriptGA);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true
    });

    gtagInicializado = true;
}

function atualizarConsentimentoCookies(status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    analyticsPermitido = status === 'aceito';

    if (analyticsPermitido) {
        inicializarGoogleAnalyticsSeNecessario();
    }

    if (cookieBannerEl) {
        cookieBannerEl.classList.remove('active');
    }
}

function inicializarConsentimentoCookies() {
    const consentimentoSalvo = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (btnAceitarCookiesEl) {
        btnAceitarCookiesEl.addEventListener('click', () => {
            atualizarConsentimentoCookies('aceito');
        });
    }

    if (btnRecusarCookiesEl) {
        btnRecusarCookiesEl.addEventListener('click', () => {
            atualizarConsentimentoCookies('recusado');
        });
    }

    if (consentimentoSalvo === 'aceito') {
        analyticsPermitido = true;
        inicializarGoogleAnalyticsSeNecessario();
        return;
    }

    analyticsPermitido = false;

    if (consentimentoSalvo !== 'recusado' && cookieBannerEl) {
        cookieBannerEl.classList.add('active');
    }
}

function enviarEventoGA(nomeEvento, parametros) {
    if (!analyticsPermitido || typeof window.gtag !== 'function') {
        return;
    }

    const parametrosEvento = { ...parametros };

    const dispararEvento = () => {
        if (typeof window.gtag !== 'function') {
            return;
        }

        window.gtag('event', nomeEvento, parametrosEvento);
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(dispararEvento, { timeout: 800 });
        return;
    }

    setTimeout(dispararEvento, 0);
}

function registrarNavegacaoSecao(tabName, rotuloAba) {
    const hashSecao = `#tab-${tabName}`;
    const pagePath = `${window.location.pathname}${hashSecao}`;
    const pageLocation = `${window.location.origin}${pagePath}`;

    if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, '', hashSecao);
    }

    enviarEventoGA('page_view', {
        page_title: `${document.title} - ${rotuloAba}`,
        page_location: pageLocation,
        page_path: pagePath
    });

    enviarEventoGA('section_view', {
        section_name: tabName,
        item_name: rotuloAba,
        action: 'visualizacao_secao'
    });
}

function embaralharArray(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

function renderizarPatrocinadores(destino, listaPatrocinadores = patrocinadores) {

    if (!destino) {
        return;
    }

    destino.innerHTML = '';
    const secaoPatrocinadores = destino.id === 'patrocinadoresRodape' ? 'patrocinadores_rodape' : 'patrocinadores';
    listaPatrocinadores.forEach((patrocinador) => {
        const card = document.createElement('div');
        card.className = 'sponsor-card';
        card.setAttribute('data-track-section', secaoPatrocinadores);
        card.setAttribute('data-track-item', patrocinador.nome);

        const box = document.createElement('div');
        box.className = 'sponsor-logo-box';

        const img = document.createElement('img');
        img.src = patrocinador.arquivo;
        img.alt = `Logo ${patrocinador.nome}`;

        const nome = document.createElement('div');
        nome.className = 'sponsor-name';
        nome.textContent = patrocinador.nome;

        box.appendChild(img);
        card.appendChild(box);
        card.appendChild(nome);
        destino.appendChild(card);
    });
}

function renderizarApoio(destino) {
    if (!destino) {
        return;
    }

    destino.innerHTML = '';
    apoiadores.forEach((apoiador) => {
        const card = document.createElement('div');
        card.className = 'sponsor-card';
        card.setAttribute('data-track-section', 'apoio_rodape');
        card.setAttribute('data-track-item', apoiador.nome);

        const box = document.createElement('div');
        box.className = 'sponsor-logo-box';

        const img = document.createElement('img');
        img.src = apoiador.arquivo;
        img.alt = `Logo ${apoiador.nome}`;

        const nome = document.createElement('div');
        nome.className = 'sponsor-name';
        nome.textContent = apoiador.nome;

        box.appendChild(img);
        card.appendChild(box);
        card.appendChild(nome);
        destino.appendChild(card);
    });
}

function renderizarMenuPorBarraca() {
    if (!menuPorBarracaEl) {
        return;
    }

    const produtosAgrupados = produtos.reduce((acc, produto) => {
        const barraca = produto.barraca;
        if (!acc[barraca]) {
            acc[barraca] = [];
        }

        acc[barraca].push(produto);
        return acc;
    }, {});

    const ordemBarracas = Object.keys(produtosAgrupados).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    menuPorBarracaEl.innerHTML = '';

    ordemBarracas.forEach((barraca) => {
        const card = document.createElement('article');
        card.className = 'menu-barraca-card';
        card.setAttribute('data-track-section', 'menu_barracas');
        card.setAttribute('data-track-item', barraca);

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
        menuPorBarracaEl.appendChild(card);
    });
}

function montarProdutos() {
    produtos.forEach((produto, index) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-nome', normalizarTexto(`${produto.nome} ${produto.barraca}`));
        card.setAttribute('data-index', String(index));
        card.innerHTML = `
        <div class="product-name">${produto.nome}</div>
        <div class="product-stall">Barraca  ${produto.barraca}</div>
        <div class="product-price">${formatarBRL(produto.preco)}</div>
        <div class="qty-row">
            <button class="btn btn-mini" type="button" data-action="decrease" data-index="${index}">-</button>
            <span class="qty-display" id="qty-${index}">1</span>
            <button class="btn btn-mini" type="button" data-action="increase" data-index="${index}">+</button>
            </div>
            <button class="btn btn-add" type="button" data-action="add" data-index="${index}">Adicionar</button>
        `;
        produtosGrid.appendChild(card);
    });
}

function filtrarProdutos() {
    const termoBusca = normalizarTexto(buscaProdutoEl.value.trim());
    const cards = Array.from(produtosGrid.querySelectorAll('.product-card'));
    let totalFiltrados = 0;
    const indicesVisiveis = [];

    cards.forEach((card) => {
        const nome = card.getAttribute('data-nome') || '';
        const mostrar = termoBusca === '' || nome.includes(termoBusca);
        card.style.display = mostrar ? '' : 'none';

        if (mostrar) {
            totalFiltrados += 1;
            indicesVisiveis.push(Number(card.getAttribute('data-index')));
        }
    });

    semResultadoBuscaEl.classList.toggle('active', totalFiltrados === 0);
    atualizarIndicadoresScrollProdutos();
    rastrearVisualizacaoLista(indicesVisiveis);
    return totalFiltrados;
}

function rastrearBuscaProdutos(totalResultados) {
    const termoDigitado = buscaProdutoEl.value.trim();
    const termoNormalizado = normalizarTexto(termoDigitado);

    if (termoNormalizado.length < 2) {
        if (termoNormalizado.length === 0) {
            ultimoTermoBuscaEnviado = '';
        }

        return;
    }

    if (termoNormalizado === ultimoTermoBuscaEnviado) {
        return;
    }

    ultimoTermoBuscaEnviado = termoNormalizado;

    enviarEventoGA('search', {
        search_term: termoDigitado,
        results_count: totalResultados,
        section_name: 'calculadora'
    });
}

function rastrearVisualizacaoLista(indicesVisiveis) {
    const indicesValidos = indicesVisiveis.filter((indice) => Number.isInteger(indice) && indice >= 0);
    if (indicesValidos.length === 0) {
        ultimaListaProdutosEnviada = '';
        return;
    }

    const assinaturaLista = indicesValidos.join(',');
    if (assinaturaLista === ultimaListaProdutosEnviada) {
        return;
    }

    ultimaListaProdutosEnviada = assinaturaLista;

    const itensVisiveis = indicesValidos.slice(0, 25).map((indice) => ({
        item_name: produtos[indice].nome,
        item_category: produtos[indice].barraca,
        price: produtos[indice].preco,
        index: indice
    }));

    enviarEventoGA('view_item_list', {
        item_list_name: 'Produtos da Calculadora',
        item_list_id: 'calculadora_produtos',
        items: itensVisiveis
    });
}

function atualizarIndicadoresScrollProdutos() {
    if (!produtosScrollWrapperEl || !produtosScrollBoxEl || !produtosScrollHintEl) {
        return;
    }

    const temOverflow = (produtosScrollBoxEl.scrollHeight - produtosScrollBoxEl.clientHeight) > 8;
    const chegouNoFim = (produtosScrollBoxEl.scrollTop + produtosScrollBoxEl.clientHeight) >= (produtosScrollBoxEl.scrollHeight - 8);

    produtosScrollWrapperEl.classList.toggle('is-scrollable', temOverflow);
    produtosScrollWrapperEl.classList.toggle('at-bottom', chegouNoFim);

    if (!temOverflow) {
        produtosScrollHintEl.classList.remove('active');
        produtosScrollHintEl.textContent = '';
        return;
    }

    produtosScrollHintEl.classList.add('active');
    produtosScrollHintEl.textContent = chegouNoFim ? 'Fim da lista de itens' : 'Deslize para ver mais itens';
}

function renderizar() {
    if (itens.length === 0) {
        tabelaItens.innerHTML = '<tr><td class="cart-empty" colspan="2">Nenhum item adicionado.</td></tr>';
        totalEl.textContent = formatarBRL(0);
        return;
    }

    tabelaItens.innerHTML = '';
    let total = 0;

    itens.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong class="cart-item-title">${item.nome}</strong>
                <small class="cart-item-meta">Barraca: ${item.barraca}</small>
                <small class="cart-item-meta">Qtd: ${item.quantidade} | Unit: ${formatarBRL(item.preco)}</small>
                <small class="cart-item-meta">Subtotal: ${formatarBRL(subtotal)}</small>
            </td>
            <td><button class="btn btn-danger" data-remove="${index}" type="button">Remover</button></td>
        `;
        tabelaItens.appendChild(tr);
    });

    totalEl.textContent = formatarBRL(total);
}

function adicionarItem(indice, quantidade) {
    const produto = produtos[indice];
    itens.push({
        nome: produto.nome,
        barraca: produto.barraca,
        preco: produto.preco,
        quantidade
    });
    renderizar();
}

produtosGrid.addEventListener('click', (event) => {
    const botao = event.target.closest('[data-action]');
    if (!botao) {
        return;
    }

    const indice = Number(botao.getAttribute('data-index'));
    const acao = botao.getAttribute('data-action');
    const qtdEl = document.getElementById(`qty-${indice}`);
    let quantidadeAtual = Number(qtdEl.textContent);

    if (acao === 'increase') {
        quantidadeAtual += 1;
        qtdEl.textContent = quantidadeAtual;
        return;
    }

    if (acao === 'decrease') {
        quantidadeAtual = Math.max(1, quantidadeAtual - 1);
        qtdEl.textContent = quantidadeAtual;
        return;
    }

    if (acao === 'add') {
        adicionarItem(indice, quantidadeAtual);
        qtdEl.textContent = '1';
        buscaProdutoEl.value = '';
        filtrarProdutos();
        ultimoTermoBuscaEnviado = '';
        enviarEventoGA('item_click', {
            section_name: 'calculadora',
            item_name: produtos[indice].nome,
            action: 'adicionar_carrinho',
            quantity: quantidadeAtual
        });

        enviarEventoGA('add_to_cart', {
            currency: 'BRL',
            value: produtos[indice].preco * quantidadeAtual,
            items: [
                {
                    item_name: produtos[indice].nome,
                    item_category: produtos[indice].barraca,
                    price: produtos[indice].preco,
                    quantity: quantidadeAtual
                }
            ]
        });
    }
});

buscaProdutoEl.addEventListener('input', () => {
    const totalResultados = filtrarProdutos();

    if (debounceBuscaTimer) {
        clearTimeout(debounceBuscaTimer);
    }

    debounceBuscaTimer = setTimeout(() => {
        rastrearBuscaProdutos(totalResultados);
    }, 550);
});

if (produtosScrollBoxEl) {
    produtosScrollBoxEl.addEventListener('scroll', atualizarIndicadoresScrollProdutos);
}

window.addEventListener('resize', atualizarIndicadoresScrollProdutos);

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        const painelAtivo = document.getElementById(`tab-${tabName}`);
        const rotuloAba = button.textContent.trim();

        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        button.classList.add('active');
        if (painelAtivo) {
            painelAtivo.classList.add('active');
            painelAtivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (tabName === 'calculadora') {
            }
        }
        if (footerEl) {
            footerEl.style.display = tabName === 'patrocinadores' ? 'none' : '';
        }

        enviarEventoGA('section_click', {
            section_name: tabName,
            item_name: rotuloAba,
            action: 'troca_aba'
        });

        registrarNavegacaoSecao(tabName, rotuloAba);
    });
});

if (calculadoraBtn) {
    calculadoraBtn.addEventListener('click', () => {
        const botaoAbaCalculadora = document.querySelector('.tab-btn[data-tab="calculadora"]');
        if (botaoAbaCalculadora) {
            botaoAbaCalculadora.click();
        }
    });
}

btnLimpar.addEventListener('click', () => {
    itens.length = 0;
    renderizar();
    enviarEventoGA('item_click', {
        section_name: 'calculadora',
        item_name: 'carrinho',
        action: 'limpar_tudo'
    });
});

tabelaItens.addEventListener('click', (event) => {
    const botao = event.target.closest('[data-remove]');
    if (!botao) {
        return;
    }

    const indice = Number(botao.getAttribute('data-remove'));
    const nomeItem = itens[indice]?.nome || 'item';
    itens.splice(indice, 1);
    renderizar();
    enviarEventoGA('item_click', {
        section_name: 'calculadora',
        item_name: nomeItem,
        action: 'remover_item'
    });
});

function abrirMapa() {
    mapModal.classList.add('active');
    mapModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    enviarEventoGA('item_click', {
        section_name: 'mapa',
        item_name: 'abrir_mapa',
        action: 'abrir_modal'
    });
}

function fecharMapa() {
    mapModal.classList.remove('active');
    mapModal.setAttribute('aria-hidden', 'true');
    mapModalImage.classList.remove('zoomed');
    document.body.style.overflow = '';
}

btnAbrirMapa.addEventListener('click', abrirMapa);
btnFecharMapa.addEventListener('click', fecharMapa);

mapModal.addEventListener('click', (event) => {
    if (event.target === mapModal) {
        fecharMapa();
    }
});

mapModalImage.addEventListener('click', () => {
    mapModalImage.classList.toggle('zoomed');
    enviarEventoGA('item_click', {
        section_name: 'mapa',
        item_name: 'imagem_mapa',
        action: mapModalImage.classList.contains('zoomed') ? 'zoom_in' : 'zoom_out'
    });
});

document.addEventListener('click', (event) => {
    const itemRastreavel = event.target.closest('[data-track-item]');
    if (!itemRastreavel) {
        return;
    }

    enviarEventoGA('item_click', {
        section_name: itemRastreavel.getAttribute('data-track-section') || 'geral',
        item_name: itemRastreavel.getAttribute('data-track-item') || 'item',
        action: 'click_item'
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mapModal.classList.contains('active')) {
        fecharMapa();
    }
});

montarProdutos();
inicializarConsentimentoCookies();
atualizarIndicadoresScrollProdutos();
renderizarApoio(apoioRodapeEl);
renderizarMenuPorBarraca();

const patrocinadoresEmbaralhados = embaralharArray(patrocinadores);
renderizarPatrocinadores(patrocinadoresAbaEl, patrocinadoresEmbaralhados);
renderizarPatrocinadores(patrocinadoresRodapeEl, patrocinadoresEmbaralhados);


filtrarProdutos();
renderizar();
