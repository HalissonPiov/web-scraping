# 🖥️ Rastreador de Preços de Hardware

Aplicação de Web Scraping em Node.js para monitorar e registrar preços de componentes de hardware (como SSDs, processadores, memória RAM, placas de vídeo e outros componentes) nos sites **Kabum** e **Mercado Livre**. Os dados são coletados automaticamente e salvos tanto em arquivo `.csv` quanto em banco de dados **PostgreSQL** para análise futura de variação de preços.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no backend
- **Axios** – Requisições HTTP para obter o HTML das páginas
- **Cheerio** – Parse de HTML para extrair dados dos sites
- **csv-writer** – Escrita de arquivos `.csv` com os dados coletados
- **PostgreSQL** – Banco de dados para armazenamento persistente dos produtos
- **pg** – Driver PostgreSQL para Node.js
- **dotenv** – Gerenciamento de variáveis de ambiente
- **node-cron** – Agendamento automático de tarefas para coleta diária

---

## 📌 Funcionalidades

- 🔎 Realiza scraping de produtos em múltiplas categorias:
  - **Kabum**: Hardware Geral, Memória RAM, Processadores, SSD, Placa de Vídeo
  - **Mercado Livre**: Componentes de hardware diversos
- 📁 Armazena os dados em arquivo `historico.csv` no formato pronto para análise
- 🎲 Salva automaticamente no banco PostgreSQL com campos estruturados
- 🏷️ Extração inteligente de marcas dos nomes dos produtos
- ✅ Validação e tratamento de dados inconsistentes
- 📅 Agendamento automático para coleta diária (configurável)

---

## 🛠️ Como Executar a Aplicação

### 1. Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL instalado e rodando
- Acesso à internet para realizar o scraping

### 2. Clone o repositório
```bash
git clone https://github.com/seu-usuario/hardware-price-tracker.git
cd hardware-price-tracker
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Configure o banco de dados
Crie um arquivo `.env` na raiz do projeto com as configurações do PostgreSQL:
```env
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=hardware_scraper
DB_HOST=localhost
DB_PORT=5432
```

### 5. Execute a aplicação manualmente
```bash
node index.js
```

---

## 📊 Estrutura dos Dados Coletados

### Campos salvos no banco PostgreSQL:
- **nome**: Nome do produto
- **preco**: Preço em formato numérico (ex: 47.77)
- **marca**: Marca extraída automaticamente do nome
- **link**: URL do produto
- **site**: Origem do produto (Kabum ou Mercado Livre)
- **data**: Data da coleta (YYYY-MM-DD)

### Arquivo CSV gerado:
- Arquivo `historico.csv` na pasta `data/`
- Sobrescreve dados anteriores a cada execução
- Formato compatível com Excel e ferramentas de análise
<code>node index.js</code>