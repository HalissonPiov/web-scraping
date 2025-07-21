const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTerabyte() {
  const url = 'https://www.terabyteshop.com.br/hardware/ssd';
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const $ = cheerio.load(data);
  const produtos = [];

  $('.commerce_columns_item_inner').each((i, el) => {
    const nome = $(el).find('.prod-name').text().trim();
    const preco = $(el).find('.prod-new-price').text().replace('R$', '').trim();
    const link = 'https://www.terabyteshop.com.br' + $(el).find('a').attr('href');
    const marca = nome.split(' ')[0]; // pode adaptar conforme necessidade

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

  return produtos;
}

module.exports = scrapeTerabyte;
