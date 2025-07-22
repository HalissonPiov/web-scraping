import axios from 'axios';
import { load } from 'cheerio';


async function scrapeMercadoLivre() {
  try {
    console.log('Buscando produtos no Mercado Livre...');
    
    const urls = [
      'https://lista.mercadolivre.com.br/informatica/componentes-pc/memorias/memoria-ram',
      'https://lista.mercadolivre.com.br/informatica/componentes-pc/discos-duros-ssds/discos-estado-solido-ssd',
      'https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores',
      'https://lista.mercadolivre.com.br/informatica/mouse-teclados/mouse/mouse-gamer'
    ];
    
    for (const url of urls) {
      try {
        console.log(`Testando Mercado Livre: ${url.split('/').slice(-2).join('/')}`);
        const { data } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
          },
          timeout: 15000,
        });
        
        const resultado = await processarPaginaMercadoLivre(data);
        if (resultado.length > 0) {
          console.log(`Mercado Livre: ${resultado.length} produtos encontrados`);
          return resultado;
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.log(`Mercado Livre erro: ${error.message}`);
        continue;
      }
    }
    
    return [];
  } catch (error) {
    console.error(`[ERRO] Mercado Livre: ${error.message}`);
    return [];
  }
}

async function processarPaginaMercadoLivre(data) {
  const $ = load(data);
  const produtos = [];
  const produtosUnicos = new Set();

  $('*').each((i, el) => {
    if (produtos.length >= 5) return false;
    
    const $el = $(el);
    const text = $el.text().trim();
    
    if (text.length > 20 && text.length < 250) {
      const hasHardware = /(?:memoria|ram|ssd|processador|mouse|gamer|placa|video|ddr|intel|amd|nvidia|corsair|kingston|samsung|wd|crucial|hyperx|asus|msi|gigabyte|ryzen|gb)/i.test(text);
      const hasPrice = /R\$\s*[\d.,]+/.test(text);
      
      if (hasHardware && hasPrice) {
        const lines = text.split(/[\n\r]/).map(line => line.trim()).filter(line => line);
        
        let nome = lines.find(line => 
          /(?:memoria|ram|ssd|processador|mouse|gamer|placa|gb)/i.test(line) && 
          line.length > 8 && 
          line.length < 120
        ) || text.substring(0, 80);
        
        const precoMatch = text.match(/R\$\s*[\d.,]+/);
        const preco = precoMatch ? precoMatch[0] : '';
        
        nome = nome.replace(/[^\w\s\-.,()]/g, ' ').replace(/\s+/g, ' ').trim();
        
        const link = $el.find('a').attr('href') || $el.closest('a').attr('href') || 'https://mercadolivre.com.br';
        const marca = nome.match(/(?:intel|amd|nvidia|corsair|kingston|samsung|wd|crucial|hyperx|asus|msi|gigabyte|corsair|hyperx)/i)?.[0] || 'Hardware';
        const chaveUnica = `${nome.substring(0, 50)}-${preco}`;
        
        if (nome && preco && !produtosUnicos.has(chaveUnica)) {
          produtosUnicos.add(chaveUnica);
          produtos.push({
            name: nome.substring(0, 100),     
            price: preco,                     
            site: 'Mercado Livre',
            category: 'Hardware',             
            url: link.startsWith('http') ? link : `https://mercadolivre.com.br${link}` 
          });
        }
      }
    }
  });

  return produtos;
}

export default scrapeMercadoLivre;
