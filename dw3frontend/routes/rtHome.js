var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Painel Principal',
    showNavbar: true,
    activeMenu: 'home'
  });
});

module.exports = router;
