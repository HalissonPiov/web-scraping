const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function salvarCsv(dados, caminho) {
  const csvWriter = createCsvWriter({
    path: caminho,
    header: [
      { id: 'nome', title: 'Nome' },
      { id: 'preco', title: 'Preço' },
      { id: 'marca', title: 'Marca' },
      { id: 'link', title: 'Link' },
      { id: 'site', title: 'Site' },
      { id: 'data', title: 'Data' },
    ],
    append: fs.existsSync(caminho),
  });

  await csvWriter.writeRecords(dados);
}

module.exports = salvarCsv;
