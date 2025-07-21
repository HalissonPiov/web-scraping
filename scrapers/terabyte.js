import axios from 'axios';
import { load } from 'cheerio';


async function scrapeTerabyte() {
  try {
    const url = 'https://www.terabyteshop.com.br/hardware/ssd';
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

    $('.commerce_columns_item_inner').each((i, el) => {
      const nome = $(el).find('.prod-name').text().trim();
      const preco = $(el).find('.prod-new-price').text().replace('R$', '').trim();
      const link = 'https://www.terabyteshop.com.br' + $(el).find('a').attr('href');
      const marca = nome.split(' ')[0]; 
      if (nome && preco) {
        produtos.push({
          nome,
          preco,
          marca,
          link,
          site: 'TerabyteShop',
          data: new Date().toISOString(),
        });
      }
    });

    console.log(`[INFO] TerabyteShop: ${produtos.length} produtos encontrados`);
    return produtos;
  } catch (error) {
    console.error(`[ERRO] TerabyteShop: ${error.message}`);
    return [];
  }
}

export default scrapeTerabyte;
