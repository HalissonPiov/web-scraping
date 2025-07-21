# 🖥️ Rastreador de Preços de Hardware

Aplicação de Web Scraping em Node.js para monitorar e registrar preços de componentes de hardware (como SSDs) nos sites **Kabum**, **Pichau** e **TerabyteShop**. Os dados são coletados automaticamente e salvos em um arquivo `.csv` para análise futura de variação de preços.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no backend
- **Axios** – Requisições HTTP para obter o HTML das páginas
- **Cheerio** – Parse de HTML para extrair dados dos sites
- **csv-writer** – Escrita de arquivos `.csv` com os dados coletados
- **node-cron** – Agendamento automático de tarefas para coleta diária

---

## 📌 Funcionalidades

- 🔎 Realiza scraping de produtos (nome, preço, marca e link) nas páginas de SSD dos três sites
- 📁 Armazena os dados em um arquivo `historico.csv` no formato pronto para análise
- 📅 Agendamento automático para rodar a coleta diariamente às 10h da manhã
- 📊 Histórico acumulativo de variações de preços ao longo do tempo


## 🛠️ Como Executar a Aplicação

### 1. Clone o repositório
<code> git clone https://github.com/seu-usuario/hardware-price-tracker.git </code>
<code> cd hardware-price-tracker </code>

### 2. Instale as dependencias
<code>npm install</code>

### 3. Execute a aplicação manualmente
<code>node index.js</code>