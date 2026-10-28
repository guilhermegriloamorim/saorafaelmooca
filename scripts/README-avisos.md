# Avisos automáticos do Instagram

A seção **Avisos e Notícias** do site mostra as últimas 6 postagens do Instagram da paróquia.

Como funciona:

1. A GitHub Action [`avisos-instagram.yml`](../.github/workflows/avisos-instagram.yml) roda a cada 3 horas.
2. Ela executa [`atualizar-avisos.js`](atualizar-avisos.js), que busca as postagens na API oficial do Instagram,
   baixa as imagens para `img/avisos/` (os links do Instagram expiram) e grava `avisos.json`.
3. Se houver novidade, a Action faz um commit; o GitHub Pages publica o site atualizado.
4. O `main.js` lê `avisos.json` e monta os cards. Sem postagens, aparece um cartão com links para as redes.

Nenhum script do Instagram/Facebook é carregado no navegador do visitante, então não há cookies de terceiros.

## Configuração (uma vez)

### 1. Conta profissional no Instagram

No app do Instagram: **Configurações → Tipo de conta e ferramentas → Mudar para conta profissional**
(Empresa ou Criador de conteúdo). É gratuito.

### 2. Gerar o token

1. Acesse <https://developers.facebook.com/apps> e crie um app do tipo **Empresa**.
2. Adicione o produto **Instagram** e escolha **API com login do Instagram**.
3. Em **Gerar tokens de acesso**, adicione a conta `@paroquiasaorafaelmoocasp` e gere o token.
   Ele é um token de longa duração (60 dias) com a permissão `instagram_business_basic`.

### 3. Cadastrar no GitHub

No repositório: **Settings → Secrets and variables → Actions → New repository secret**

| Nome | Valor |
| --- | --- |
| `IG_ACCESS_TOKEN` | o token gerado no passo 2 |
| `GH_PAT` *(recomendado)* | um [token fine-grained](https://github.com/settings/personal-access-tokens/new) só deste repositório com a permissão **Secrets: Read and write** |

Com o `GH_PAT`, a Action renova o token do Instagram todo dia 1º e salva o novo valor sozinha.
Sem ele, é preciso gerar um token novo a cada 60 dias.

### 4. Testar

**Actions → Atualizar avisos do Instagram → Run workflow.** Em cerca de 1 minuto deve aparecer um commit
"chore: atualizar avisos do Instagram" e, depois da publicação do Pages, os cards no site.

## Alternativa: token que não expira (Meta Business)

Se a conta do Instagram estiver ligada a uma Página do Facebook no Meta Business Suite, dá para usar um
token de **Usuário do Sistema**, que não expira. Nesse caso, em **Settings → Secrets and variables → Actions → Variables**:

| Variável | Valor |
| --- | --- |
| `IG_API_BASE` | `https://graph.facebook.com/v21.0` |
| `IG_USER_ID` | ID da conta profissional do Instagram (não o da Página) |

E coloque o token do Usuário do Sistema (permissões `instagram_basic` e `pages_show_list`) em `IG_ACCESS_TOKEN`.
Com `IG_API_BASE` definido, a etapa de renovação é ignorada.

## Teste local

```sh
AVISOS_FONTE_JSON=resposta-da-api.json node scripts/atualizar-avisos.js
```

`resposta-da-api.json` deve ter o formato da API (`{ "data": [ { "id", "caption", "media_type", "media_url",
"thumbnail_url", "permalink", "timestamp" } ] }`). As imagens que já existem em `img/avisos/` não são baixadas de novo.
