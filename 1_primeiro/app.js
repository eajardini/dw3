const express = require('express')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//@ Cria uma rota para o raiz
app.get('/', (req, res) => {
  res.send('Hello DW3!')
})

app.listen(port, () => {
  console.log('Executando a aplicação ' , process.env.APP_NAME);
  console.log('Example app listening on port ', port);
})
