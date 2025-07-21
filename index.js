const scrapeKabum = require('./scrapers/kabum');
const salvarCsv = require('./utils/salvarCsv');
const cron = require('node-cron');

async function coletarDados() {
  console.log('[INFO] Iniciando scraping...');
  const kabum = await scrapeKabum();
  await salvarCsv(kabum, './data/historico.csv');
  console.log(`[INFO] ${kabum.length} produtos salvos da Kabum.`);
}

cron.schedule('0 10 * * *', () => {
  coletarDados(); // executa todo dia às 10:00h
});

coletarDados(); 
