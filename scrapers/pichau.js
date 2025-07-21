import axios from 'axios';
import { load } from 'cheerio';


async function scrapePichau() {
  try {
    const url = 'https://www.pichau.com.br/hardware/armazenamento/ssd';
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en;q=0.5,en-US;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000,
    });

    const $ = load(data);
    const produtos = [];

    $('.product-card').each((i, el) => {
      const nome = $(el).find('.product-card__title').text().trim();
      const preco = $(el).find('.product-card__price--current').text().replace('R$', '').trim();
      const link = 'https://www.pichau.com.br' + $(el).find('a').attr('href');
      const marca = nome.split(' ')[0]; 

      if (nome && preco) {
        produtos.push({
          nome,
          preco,
          marca,
          link,
          site: 'Pichau',
          data: new Date().toISOString(),
        });
      }
    });

    console.log(`[INFO] Pichau: ${produtos.length} produtos encontrados`);
    return produtos;
  } catch (error) {
    console.error(`[ERRO] Pichau: ${error.message}`);
    return [];
  }
}

export default scrapePichau;
