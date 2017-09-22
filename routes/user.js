const express = require('express'),
bodyParser = require('body-parser'),
nunjucks = require('nunjucks'),
router = express.Router(),
models = require('../models'),
Page = models.Page,
User = models.User;
module.exports = router;


router.get('/', function(req,res, next){
    User.findAll({})
    .then(function (users){
         res.render('userlist', {users:users})
    })
    .catch(next);
});

router.get('/:userId', function (req,res,next) {

})