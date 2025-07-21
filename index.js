import scrapeKabum from './scrapers/kabum.js';
import scrapeMercadoLivre from './scrapers/mercadolivre.js';
import salvarCsv from './utils/salvarCsv.js';

async function main() {
  console.log('🔧 Hardware Price Tracker v2.0 - TESTE FINAL');
  console.log('Sistema de monitoramento de preços de hardware\n');
  
  const allProducts = [];
  
  try {
    // Teste Kabum
    console.log('1. Coletando do Kabum...');
    const kabumProducts = await scrapeKabum();
    allProducts.push(...kabumProducts);
    console.log(`✅ Kabum: ${kabumProducts.length} produtos`);
    
    // Teste Mercado Livre 
    console.log('\n2. Coletando do Mercado Livre...');
    const mlProducts = await scrapeMercadoLivre();
    allProducts.push(...mlProducts);
    console.log(`✅ Mercado Livre: ${mlProducts.length} produtos`);
    
    // Salvar como historico.csv
    console.log(`\n3. Salvando ${allProducts.length} produtos no historico.csv...`);
    await salvarCsv(allProducts, 'historico');
    
    console.log('\n🎯 Primeiros produtos encontrados:');
    allProducts.slice(0, 6).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} - ${p.price} (${p.site})`);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

main();
