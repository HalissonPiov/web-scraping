import pool from './db.js';


async function salvarNoBanco(produtos) {
    const client = await pool.connect();

    try {
        for (const produto of produtos) {

            if (!produto.name || !produto.price) {
                console.warn(`[AVISO] Produto inválido ignorado:`, produto);
                continue;
            }

            const precoNumerico = produto.price
                .replace(/[^\d,]/g, '')  // Remove tudo exceto dígitos e vírgula
                .replace(',', '.');       // Substitui vírgula por ponto

            const marca = produto.name.match(/(?:intel|amd|nvidia|corsair|kingston|samsung|wd|crucial|hyperx|asus|msi|gigabyte|arctic|thermal)/i)?.[0] || 'Hardware';
            
            const dataAtual = new Date().toISOString().split('T')[0]; 

            await client.query(`INSERT INTO produtos (nome, preco, marca, link, site, data)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
                produto.name,           
                precoNumerico,          
                marca,                  
                produto.url || '#',     
                produto.site,           
                dataAtual              
            ]);
        }

        console.log(`[INFO] ${produtos.length} produtos salvos no banco.`);
    }
    catch (err) {
        console.error('[ERRO] Falha ao inserir no banco:', err);
    }
    finally {
        client.release();
    }
}

export default salvarNoBanco;
