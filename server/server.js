const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
const db = require('./db')

//Body-parser para evitar problemas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

//Redirecionamento para o arquivos de rotas
app.use('/api', routes)

//Porta do servidor
app.listen('5000', () => console.log('Connected on port 5000'))

module.exports = app;
