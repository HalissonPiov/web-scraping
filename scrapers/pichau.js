const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePichau() {
  const url = 'https://www.pichau.com.br/hardware/armazenamento/ssd';
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const $ = cheerio.load(data);
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

  return produtos;
}

module.exports = scrapePichau;
