import scrapeKabum from './scrapers/kabum.js';
import scrapePichau from './scrapers/pichau.js';
import scrapeTerabyte from './scrapers/terabyte.js';
import salvarCsv from './utils/salvarCsv.js';

async function coletarDados() {
  console.log('[INFO] Iniciando scraping...');
  
  try {

    const kabum = await scrapeKabum();
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    const pichau = await scrapePichau();
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    const terabyte = await scrapeTerabyte();

    const todosProdutos = [...kabum, ...pichau, ...terabyte];

    if (todosProdutos.length > 0) {
      await salvarCsv(todosProdutos, './data/historico.csv');
      console.log(`[INFO] ${todosProdutos.length} produtos salvos no arquivo CSV.`);
    } else {
      console.log('[AVISO] Nenhum produto foi coletado dos sites.');
    }
  } catch (error) {
    console.error('[ERRO] Erro durante a coleta de dados:', error.message);
  }
}

coletarDados().catch(console.error);
