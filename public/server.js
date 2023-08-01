
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { JSDOM } = require('jsdom');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const db = new sqlite3.Database('tags.db', err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco com sucesso!');
    createTables();
  }
});

function isValidUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL,
      quantidade INTEGER NOT NULL
    )
  `, err => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela criada com sucesso!');
    }
  });
}

app.post('/count-tags', async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0 || !urls.every(isValidUrl)) {
    return res.status(400).json({ error: 'A lista de URLs é inválida.' });
  }

  try {
    const tagCounts = {};

    for (const url of urls) {
      const response = await axios.get(url, { responseType: 'text' });
      const html = response.data;
      const dom = new JSDOM(html);
      const tags = dom.window.document.getElementsByTagName('*');

      for (const tag of tags) {
        const tagName = tag.tagName.toLowerCase();
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      }
    }

    // Salvar as tags e quantidades no banco de dados
    for (const tag in tagCounts) {
      const quantidade = tagCounts[tag];
      db.run('INSERT INTO tags (tag, quantidade) VALUES (?, ?)', [tag, quantidade], err => {
        if (err) {
          console.error('Erro ao inserir dados no banco:', err.message);
        } else {
          console.log('Dados inseridos no banco com sucesso!');
        }
      });
    }

    res.json(tagCounts);
  } catch (error) {
    console.error('Erro ao fazer requisições:', error.message);
    res.status(500).json({ error: 'Erro ao processar as requisições.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
