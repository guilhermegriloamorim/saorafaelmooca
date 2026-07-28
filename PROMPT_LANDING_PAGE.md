Você é um desenvolvedor frontend especialista em UI/UX e criações para instituições de tradição. 
Preciso que você gere o código para a Landing Page completa e responsiva da **Paróquia São Rafael (Mooca - São Paulo/SP)**, pertencente à Arquidiocese de São Paulo (Região Belém) e gerida pelos Padres Barnabitas.

### 🎨 Identidade Visual e Estilo (CSS)
Use a seguinte paleta de cores e tipografia no CSS (via variáveis `:root`):
- **Verde Escuro Sacerdotal:** `#003D32` (Cor primária para headers, navbar, botões principais e footer)
- **Dourado Nobre:** `#B28330` (Cor de destaque, detalhes, bordas e divisores)
- **Bege Claro Neutro:** `#EAD8BD` (Fundo geral da página)
- **Bege Iluminado:** `#F3E0A3` (Fundo de cards ou destaques de contraste)
- **Branco:** `#FFFFFF` (Fundo de cards, textos sobre verde)
- **Fontes (Google Fonts):** 'Cinzel' para Títulos Principais, 'Playfair Display' para Subtítulos, e 'Montserrat' ou 'Inter' para o corpo de texto e navegação.

---

### 🧱 Estrutura da Página (Single-Page ou Seções bem estruturadas)

Crie o arquivo `index.html` e `style.css` com as seguintes seções responsivas:

1. **Header / Navbar:**
   - Logotipo textual "Paróquia São Rafael - Mooca".
   - Links com navegação suave: Home, História, Barnabitas, Pastorais, Sacramentos, Dízimo, Secretaria.
   - Botão em destaque "Horários de Missa".

2. **Hero Section:**
   - Título impactante de boas-vindas ("Comunidade de Fé e Oração na Mooca").
   - Subtítulo citando a tradição dos Padres Barnabitas.
   - Botões de Ação: "Ver Horários" e "Como Chegar".

3. **Seção "Avisos & Notícias" (Home):**
   - Grid com 3 cards estilizados para notícias recentes, festas padroeiras e eventos da comunidade.

4. **Seção "Horários & Localização" (Home):**
   - Tabela/Cards claros com: Horários de Missas (Dias de semana e Domingos), Confissões e Atendimento da Secretaria.
   - Endereço: Largo São Rafael, s/n - Mooca, São Paulo - SP.
   - Botão direto para "Abrir no Google Maps".

5. **Seção "Nossa História & Padres Barnabitas":**
   - Texto contando sobre a fundação da Paróquia na Mooca e a presença do carisma de Santo Antônio Maria Zaccaria e dos Padres Barnabitas.

6. **Seção "Pastorais e Movimentos":**
   - Grid responsivo de cards exibindo pastorais (ex: Catequese, Dízimo, Liturgia, Social, Eventos, Juventude) com breves descrições.

7. **Seção "Sacramentos":**
   - Guias ou cards sanfonados (accordion/cards) sobre Batismo, Primeira Eucaristia, Crisma e Matrimônio, informando onde buscar orientações na secretaria.

8. **Seção "Dízimo e Oferta":**
   - Card em destaque com explicação sobre o Dízimo.
   - Bloco visual com a Chave PIX, botão "Copiar Chave PIX" (com JavaScript simples) e dados bancários.

9. **Seção "Secretaria & Contato":**
   - Horários de funcionamento da secretaria paroquial.
   - Links/botões para o Instagram oficial `@paroquiasaorafaelmoocasp` e Facebook.
   - Botão flutuante ou destacado de "Falar no WhatsApp da Secretaria".

10. **Footer (Rodapé):**
    - Cor de fundo `#003D32`.
    - Endereço completo, contatos, copyright e créditos à Região Episcopal Belém / Arquidiocese de SP.

---

### 💻 Requisitos Técnicos
- HTML5 semântico (tags `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- CSS3 moderno utilizando Flexbox e CSS Grid, com media queries para total responsividade em smartphones e desktops.
- JavaScript puro (`main.js`) apenas para o menu mobile (hambúrguer), scroll suave e a função de copiar a Chave PIX.
- Código limpo, bem comentado e pronto para execução.