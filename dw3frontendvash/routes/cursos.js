var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('cursos', {
    title: 'Cursos',
    showNavbar: true,
    activeMenu: 'cursos'
  });
});

module.exports = router;
