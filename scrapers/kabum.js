const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeKabum() {
  const url = 'https://www.kabum.com.br/hardware/ssd'; 
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const produtos = [];

  $('.productCard').each((i, el) => {
    const nome = $(el).find('.nameCard').text().trim();
    const preco = $(el).find('.priceCard').text().replace('R$', '').trim();
    const link = 'https://www.kabum.com.br' + $(el).find('a').attr('href');
    const marca = nome.split(' ')[0]; 

    if (nome && preco) {
      produtos.push({ nome, preco, marca, link, site: 'Kabum', data: new Date().toISOString() });
    }
  });

  return produtos;
}

module.exports = scrapeKabum;
