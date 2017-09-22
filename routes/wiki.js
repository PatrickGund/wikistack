const express = require('express'),
bodyParser = require('body-parser'),
nunjucks = require('nunjucks'),
app = express(),
router = app.Router(),
models = require('../models'),
Page = models.Page,
User = models.User;
module.exports = router;


router.get('/', function(req,res, next){
    Page.findAll({})
    .then(function (pages){
        res.render('index', {pages:pages})
    })
    .catch(next);
});

router.get('/add', function(req, res, next){
    res.render('addpage');
});

router.post('/', function (req, res, next){
    Page.create({})
    .then(function(pages){
        res.render('index', {pages:pages})
    })
    .catch(next)
});
