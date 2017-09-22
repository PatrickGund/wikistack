const models = require('./models');
const http = require("http");
const server = http.createServer();
var Promise = require('bluebird');
server.on('request', require('./app'));

models.Page.sync({})
.then(function(){
    models.User.sync({})
})
.then(function(){
    server.listen(3001, function(){
        console.log('Server is listening on Port 3001');
    })
})
.catch(function(err){
    console.error(err);
});

