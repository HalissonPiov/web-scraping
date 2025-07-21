import { existsSync } from 'fs';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

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
    append: existsSync(caminho),
  });

  await csvWriter.writeRecords(dados);
}

export default salvarCsv;
