const QRCode = require('qrcode');

// O link da paróquia que será codificado
const url = 'https://paroquiasaorafaelmooca.com.br/';

// Nome do arquivo de saída
const nomeArquivo = '../img/qrcode.png';

console.log('Gerando seu QR Code, me lorde...');

// Função que cria o arquivo PNG
QRCode.toFile(nomeArquivo, url, {
  color: {
    dark: '#000000',  // Cor dos módulos (Preto)
    light: '#FFFFFF' // Cor do fundo (Branco)
  },
  width: 800 // Tamanho da imagem em pixels (opcional, mas bom para dar nitidez)
}, function (err) {
  if (err) {
    console.error('Erro ao gerar o QR Code:', err);
    return;
  }
  console.log(`Sucesso! O QR Code foi salvo como: ${nomeArquivo}`);
});