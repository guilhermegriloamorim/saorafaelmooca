#!/usr/bin/env node
/*
 * Busca as últimas postagens do Instagram da paróquia e gera avisos.json + img/avisos/.
 * Roda na GitHub Action .github/workflows/avisos-instagram.yml.
 *
 * Variáveis de ambiente:
 *   IG_ACCESS_TOKEN  token de acesso (obrigatório)
 *   IG_API_BASE      padrão https://graph.instagram.com/v21.0 (Instagram API com login do Instagram).
 *                    Para token de Usuário do Sistema do Meta Business use https://graph.facebook.com/v21.0
 *   IG_USER_ID       padrão "me". Com graph.facebook.com informe o ID da conta profissional do Instagram.
 *   AVISOS_LIMITE    quantidade de postagens (padrão 6)
 *   AVISOS_FONTE_JSON  (teste local) arquivo com uma resposta da API para usar no lugar da chamada real
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const RAIZ = path.resolve(__dirname, '..');
const ARQUIVO_JSON = path.join(RAIZ, 'avisos.json');
const PASTA_IMAGENS = path.join(RAIZ, 'img', 'avisos');
const PERFIL_URL = 'https://www.instagram.com/paroquiasaorafaelmoocasp/';

const token = process.env.IG_ACCESS_TOKEN;
const apiBase = (process.env.IG_API_BASE || 'https://graph.instagram.com/v21.0').replace(/\/$/, '');
const userId = process.env.IG_USER_ID || 'me';
const limite = Number(process.env.AVISOS_LIMITE) || 6;
const fonteLocal = process.env.AVISOS_FONTE_JSON;

function baixar(url, redirecionamentos) {
  return new Promise(function (resolve, reject) {
    https.get(url, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && (redirecionamentos || 0) < 5) {
        res.resume();
        resolve(baixar(new URL(res.headers.location, url).toString(), (redirecionamentos || 0) + 1));
        return;
      }

      const partes = [];
      res.on('data', function (parte) { partes.push(parte); });
      res.on('end', function () {
        const corpo = Buffer.concat(partes);
        if (res.statusCode !== 200) {
          // Não expõe o token na mensagem de erro.
          const urlSegura = url.replace(/access_token=[^&]+/, 'access_token=***');
          reject(new Error('HTTP ' + res.statusCode + ' em ' + urlSegura + ': ' + corpo.toString().slice(0, 300)));
          return;
        }
        resolve(corpo);
      });
    }).on('error', reject);
  });
}

async function buscarPostagens() {
  if (fonteLocal) {
    return JSON.parse(fs.readFileSync(fonteLocal, 'utf8')).data || [];
  }

  if (!token) {
    // Ainda não configurado: não falha para a Action não gerar alertas a cada execução.
    console.log('IG_ACCESS_TOKEN não definido; veja scripts/README-avisos.md.');
    return [];
  }

  const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const url = apiBase + '/' + encodeURIComponent(userId) + '/media?fields=' + campos +
    '&limit=' + (limite * 2) + '&access_token=' + encodeURIComponent(token);
  const resposta = JSON.parse((await baixar(url)).toString('utf8'));
  return resposta.data || [];
}

function resumirLegenda(legenda) {
  const texto = (legenda || '').replace(/[ \t]+\n/g, '\n').trim();
  // Remove o bloco de hashtags do final, que só polui o card.
  return texto.replace(/(\s*#[\p{L}\p{N}_]+)+\s*$/u, '').trim();
}

async function main() {
  const postagens = (await buscarPostagens())
    .filter(function (p) { return p.permalink && (p.thumbnail_url || p.media_url); })
    .slice(0, limite);

  if (postagens.length === 0) {
    console.log('Nenhuma postagem retornada; avisos.json mantido como está.');
    return;
  }

  fs.mkdirSync(PASTA_IMAGENS, { recursive: true });
  const arquivosUsados = new Set();
  const avisos = [];

  for (const p of postagens) {
    const nomeArquivo = String(p.id).replace(/[^\w-]/g, '') + '.jpg';
    const destino = path.join(PASTA_IMAGENS, nomeArquivo);
    arquivosUsados.add(nomeArquivo);

    if (!fs.existsSync(destino)) {
      // Vídeos e reels usam a capa (thumbnail_url); fotos e carrosséis usam media_url.
      const origem = p.media_type === 'VIDEO' ? (p.thumbnail_url || p.media_url) : (p.media_url || p.thumbnail_url);
      fs.writeFileSync(destino, await baixar(origem));
      console.log('Imagem baixada:', nomeArquivo);
    }

    avisos.push({
      id: String(p.id),
      tipo: p.media_type || 'IMAGE',
      legenda: resumirLegenda(p.caption),
      link: p.permalink,
      imagem: 'img/avisos/' + nomeArquivo,
      data: p.timestamp || null
    });
  }

  // Remove imagens de postagens que saíram da lista.
  fs.readdirSync(PASTA_IMAGENS).forEach(function (arquivo) {
    if (!arquivosUsados.has(arquivo) && arquivo !== '.gitkeep') {
      fs.unlinkSync(path.join(PASTA_IMAGENS, arquivo));
      console.log('Imagem removida:', arquivo);
    }
  });

  const anterior = fs.existsSync(ARQUIVO_JSON) ? JSON.parse(fs.readFileSync(ARQUIVO_JSON, 'utf8')) : null;
  if (anterior && JSON.stringify(anterior.posts) === JSON.stringify(avisos)) {
    console.log('Sem novidades.');
    return;
  }

  const saida = {
    atualizado_em: new Date().toISOString(),
    perfil: PERFIL_URL,
    posts: avisos
  };
  fs.writeFileSync(ARQUIVO_JSON, JSON.stringify(saida, null, 2) + '\n');
  console.log('avisos.json atualizado com', avisos.length, 'postagens.');
}

main().catch(function (erro) {
  console.error(erro.message);
  process.exit(1);
});
