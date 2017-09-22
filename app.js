const express = require('express');
const app = express();
const morgan = require('morgan');
const bluebird = require('bluebird');
const marked = require('marked');
const path = require('path');
const nunjucks = require('nunjucks');


module.exports = app;


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', {noCache:true});
require(('./filters')(env));





app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public' )));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser, json());

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', function(req, res){
    res.render('index');
});


app.use(function(err, req,res,next){
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal Error");
});