const express = require('express'),
bodyParser = require('body-parser'),
nunjucks = require('nunjucks'),
router = express.Router(),
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
    console.log(req.body, "req.body");
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    .spread(function (user, createdPageBool) {
        return Page.create(req.body)
            .then(function (page) {
                return page.setAuthor(user);
            });
    })
    .then(function (page) {
        res.redirect(page.route);
    })
    .catch(next);
});

