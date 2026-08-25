var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('alunos/vwLstAlunos', {
    title: 'Alunos',
    showNavbar: true,
    activeMenu: 'alunos',
    servidorDw3: process.env.SERVIDOR_DW3
  });
});

module.exports = router;
