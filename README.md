# Contador de Tags HTML - README

Este é um projeto de contador de tags HTML que permite contar e armazenar a quantidade de tags em uma página HTML, por meio de uma lista de URLs informadas pelo usuário. O projeto é composto por um servidor Node.js que utiliza Express e SQLite para armazenamento de dados, e um cliente web com HTML, CSS e JavaScript.

## Funcionamento

O projeto consiste em duas partes: o servidor e o cliente web.

### Servidor

O servidor é responsável por receber a lista de URLs enviadas pelo cliente web, acessar cada URL, contar as tags HTML nas páginas e armazenar os resultados em um banco de dados SQLite.

O servidor foi implementado com Node.js e Express para a criação das rotas. Utilizamos a biblioteca `axios` para fazer as requisições HTTP para cada URL informada pelo cliente web e `jsdom` para emular o comportamento do DOMParser no ambiente Node.js e contar as tags nas páginas.

### Cliente Web

O cliente web é uma aplicação front-end simples que permite ao usuário informar uma lista de URLs e visualizar as tags HTML e suas quantidades nas páginas acessadas.

O cliente web foi implementado com HTML, CSS e JavaScript. Utilizamos `fetch` para fazer a requisição POST para o servidor e receber os resultados.

## Como usar

1. Instale as dependências do projeto executando o comando `npm install` na pasta raiz do projeto.

2. Inicie o servidor Node.js executando o comando `npm start` na pasta raiz do projeto. O servidor estará disponível em `http://localhost:3000`.

3. Acesse o cliente web abrindo seu navegador a URL: `http://localhost:3000`.

4. No cliente web, digite uma lista de URLs separadas por vírgula no campo de texto e clique no botão "Contar..." para visualizar as tags HTML e suas quantidades nas páginas acessadas.

## Observações

- Certifique-se de que o banco de dados SQLite está sendo criado corretamente e que o servidor está conectado a ele antes de utilizar o cliente web.

- O cliente web está configurado para fazer requisições para o servidor em `http://localhost:3000`. Se o servidor estiver sendo executado em outra porta ou em um endereço diferente, atualize o código do cliente web com o novo endereço do servidor.

- O cliente web não trata todos os possíveis erros e cenários de forma robusta. Para uma aplicação mais completa e segura, considere implementar mais validações e tratamentos de erros.

- O projeto é apenas uma demonstração e pode ser expandido e aprimorado para atender a requisitos específicos.

Se você tiver alguma dúvida ou precisar de mais assistência, sinta-se à vontade para entrar em contato. Bom aprendizado!
