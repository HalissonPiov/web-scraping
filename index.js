import scrapeKabum from './scrapers/kabum.js';
import scrapeMercadoLivre from './scrapers/mercadolivre.js';
import salvarCsv from './utils/salvarCsv.js';
import salvarNoBanco from './utils/salvarDb.js';


async function coletarDados() {
  console.log('[INFO] Iniciando sistema de monitoramento de preços de hardware...\n');
  
  try {
    const allProducts = [];
    
    const scrapers = [
      { nome: 'Kabum', func: scrapeKabum, priority: 1 },
      { nome: 'Mercado Livre', func: scrapeMercadoLivre, priority: 2 },
    ];
    
    for (const scraper of scrapers) {
      try {
        console.log(`\n[INFO] Testando ${scraper.nome}...`);
        const produtos = await scraper.func();
        
        if (produtos && produtos.length > 0) {
          allProducts.push(...produtos);
          console.log(`${scraper.nome}: ${produtos.length} produtos coletados`);
        } else {
          console.log(`${scraper.nome}: Nenhum produto encontrado`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Erro em ${scraper.nome}: ${error.message}`);
        continue;
      }
    }

    if (allProducts.length > 0) {
      await salvarCsv(allProducts, 'historico');
      await salvarNoBanco(allProducts);
      
      console.log(`\nRESUMO FINAL:`);
      console.log(`Total de produtos: ${allProducts.length}`);
      
      const siteCount = {};
      allProducts.forEach(product => {
        siteCount[product.site] = (siteCount[product.site] || 0) + 1;
      });
      
      console.log(`Sites funcionais:`);
      Object.entries(siteCount).forEach(([site, count]) => {
        console.log(`  ${site}: ${count} produtos`);
      });
      
      console.log(`\nExemplos de produtos encontrados:`);
      
      const siteExamples = {};
      allProducts.forEach(product => {
        if (!siteExamples[product.site]) {
          siteExamples[product.site] = [];
        }
        if (siteExamples[product.site].length < 3) {
          siteExamples[product.site].push(product);
        }
      });
      
      let exampleIndex = 1;
      Object.entries(siteExamples).forEach(([site, products]) => {
        products.forEach(product => {
          console.log(`  ${exampleIndex}. ${product.name} - ${product.price} (${product.site})`);
          exampleIndex++;
        });
      });
      
    } else {
      console.log('\n[AVISO] Nenhum produto foi encontrado em nenhum site.');
      console.log('Verifique a conexão com a internet e tente novamente.');
    }

  } catch (error) {
    console.error('[ERRO] Erro geral no scraping:', error.message);
  }
}

coletarDados();
