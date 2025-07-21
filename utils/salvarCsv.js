import fs from 'fs';
import path from 'path';

export default function salvarCsv(produtos, nomeArquivo = 'historico') {
    if (!produtos || produtos.length === 0) {
        console.log('⚠️ Nenhum produto para salvar');
        return;
    }

    // Garantir que tem a extensão .csv
    if (!nomeArquivo.endsWith('.csv')) {
        nomeArquivo += '.csv';
    }

    // Criar cabeçalho CSV
    const headers = ['Nome', 'Preço', 'Site', 'Categoria', 'URL', 'Data'];
    
    // Criar linhas CSV
    const linhas = produtos.map(produto => {
        const nome = (produto.name || produto.nome || 'N/A').replace(/"/g, '""');
        const preco = produto.price || produto.preco || 'N/A';
        const site = produto.site || 'N/A';
        const categoria = produto.category || produto.categoria || 'Hardware';
        const url = produto.url || produto.link || 'N/A';
        const data = new Date().toLocaleString('pt-BR');
        
        return `"${nome}","${preco}","${site}","${categoria}","${url}","${data}"`;
    });

    // Juntar tudo
    const csvContent = [headers.join(','), ...linhas].join('\n');

    // Salvar arquivo
    const outputPath = path.join('data', nomeArquivo);
    
    // Criar diretório data se não existir
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }

    fs.writeFileSync(outputPath, csvContent, 'utf8');
    
    console.log(`✅ CSV salvo: ${outputPath}`);
    console.log(`📄 ${produtos.length} produtos salvos`);
    
    return outputPath;
}
