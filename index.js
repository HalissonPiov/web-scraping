import scrapeKabum from './scrapers/kabum.js';
import scrapeMercadoLivre from './scrapers/mercadolivre.js';
import salvarCsv from './utils/salvarCsv.js';

async function coletarDados() {
  console.log('[INFO] 🚀 Iniciando sistema de monitoramento de preços de hardware...\n');
  
  try {
    const allProducts = [];
    
    // Lista de scrapers funcionais (priorizando os que sabemos que funcionam)
    const scrapers = [
      { nome: 'Kabum', func: scrapeKabum, priority: 1 },
      { nome: 'Mercado Livre', func: scrapeMercadoLivre, priority: 2 }
    ];
    
    // Executar scrapers por prioridade
    for (const scraper of scrapers) {
      try {
        console.log(`\n[INFO] Testando ${scraper.nome}...`);
        const produtos = await scraper.func();
        
        if (produtos && produtos.length > 0) {
          allProducts.push(...produtos);
          console.log(`✅ ${scraper.nome}: ${produtos.length} produtos coletados`);
        } else {
          console.log(`❌ ${scraper.nome}: Nenhum produto encontrado`);
        }
        
        // Delay entre scrapers para evitar sobrecarga
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`❌ Erro em ${scraper.nome}: ${error.message}`);
        continue;
      }
    }

    // Salva os dados coletados
    if (allProducts.length > 0) {
      const fileName = `hardware_prices_${new Date().toISOString().split('T')[0]}`;
      await salvarCsv(allProducts, fileName);
      
      console.log(`\n📊 RESUMO FINAL:`);
      console.log(`Total de produtos: ${allProducts.length}`);
      
      // Contar produtos por site
      const siteCount = {};
      allProducts.forEach(product => {
        siteCount[product.site] = (siteCount[product.site] || 0) + 1;
      });
      
      console.log(`Sites funcionais:`);
      Object.entries(siteCount).forEach(([site, count]) => {
        console.log(`  ${site}: ${count} produtos`);
      });
      
      console.log(`\n🎯 Exemplos de produtos encontrados:`);
      
      // Mostrar produtos de diferentes sites de forma balanceada
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
      console.log('\n[AVISO] ❌ Nenhum produto foi encontrado em nenhum site.');
      console.log('Verifique a conexão com a internet e tente novamente.');
    }

  } catch (error) {
    console.error('[ERRO] Erro geral no scraping:', error.message);
  }
}

// Executar o sistema
console.log('🔧 Hardware Price Tracker v2.0');
console.log('Sistema de monitoramento de preços de hardware\n');

coletarDados();
