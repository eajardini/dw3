var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('alunos', {
    title: 'Alunos',
    showNavbar: true,
    activeMenu: 'alunos'
  });
});

module.exports = router;
