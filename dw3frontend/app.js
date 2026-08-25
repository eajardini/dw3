
//-- app.js
//-- Para rodar: node app.js 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

var indexRouter = require('./routes/rtIndex');
var loginRouter = require('./routes/rtLogin');
var homeRouter = require('./routes/rtHome');
var alunosRouter = require('./routes/rtAlunos');

require('dotenv').config({ path: path.join(__dirname, 'dw3frontend.env'), quiet: true });

var app = express();
var viewsPath = path.join(__dirname, 'views');
var appsPath = path.join(__dirname, 'apps');
const port = process.env.PORT || 40100;
app.set('views', [viewsPath, appsPath]);
app.set('view engine', 'njk');

nunjucks.configure([viewsPath, appsPath], {
  autoescape: true,
  express: app,
  noCache: app.get('env') === 'development'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/apps', express.static(path.join(__dirname, 'apps')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/alunos', alunosRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Erro' });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
