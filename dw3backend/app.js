// Para rodar: node apps.js


const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./routes/router');
 
const app = express();
const port = 40000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.json());

//@ Utiliza o routerApp configurado em ./routes/route.js
app.use(router);



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
