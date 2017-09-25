const express = require('express'),
bodyParser = require('body-parser'),
nunjucks = require('nunjucks'),
router = express.Router(),
models = require('../models'),
Promise = require('bluebird');
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
    var findUser = User.findById(req.params.userId);

    var findPages = Page.findAll({
        where: {
            authorId: req.params.userId
        }
    });


    Promise.all([findUser, findPages])
    .spread((user, userPages) => {
        res.render('userpages', {
            pages: userPages,
            user: user
        });
    })
    .catch(next);
})


router.post('/user/:userId', (req,res,next) => {
    User.create({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect(
        '/user/:userId'
    )
    .catch(next)
});


router.put('/user/:userId',  (req,res,next) => {
    User.update({
        name: req.body.name,
        email: req.body.email
    })

    res.redirect(
        '/user/:userId'
    )
});

router.delete('/user/:userId/delete', (req,res,next) => {
    User.destroy({
        where: {
            name: req.body.name
        }
    })
})