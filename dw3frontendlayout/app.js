var createError = require('http-errors');
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

// var indexRouter = require('./routes/index');

var app = express();
var viewsPath = path.join(__dirname, 'views');
const port = process.env.PORT || 40100;
app.set('views', viewsPath);
app.set('view engine', 'njk');

nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: app.get('env') === 'development'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
