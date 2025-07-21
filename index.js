const scrapeKabum = require('./scrapers/kabum');
const scrapePichau = require('./scrapers/pichau');
const scrapeTerabyte = require('./scrapers/terabyte');
const salvarCsv = require('./utils/salvarCsv');

async function coletarDados() {
  console.log('[INFO] Iniciando scraping...');
  const [kabum, pichau, terabyte] = await Promise.all([
    scrapeKabum(),
    scrapePichau(),
    scrapeTerabyte()
  ]);

  const todosProdutos = [...kabum, ...pichau, ...terabyte];

  await salvarCsv(todosProdutos, './data/historico.csv');
  console.log(`[INFO] ${todosProdutos.length} produtos salvos.`);
}
