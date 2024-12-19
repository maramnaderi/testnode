var express = require('express')
var userRouter = require('./user/controller')
var ordinateurRouter = require('./ordinateur/controller')
var chatRouter = require('./chat/controller')
var osRouter = require('./os/controller')
var productRouter = require('./product/controller')
var mongoose = require('mongoose')
var path = require('path')
var {sockeIO} =require('./chat/chatService')


var app= express()
app.set('views',path.join(__dirname,'views'))
app.set('view engine','twig')
app.use(express.json())
app.use('/users', userRouter)
app.use('/ordinateurs', ordinateurRouter)
app.use('/chat',chatRouter)
app.use('/os', osRouter)
app.use('/products', productRouter)

mongoose.connect('mongodb://localhost:27017/user-db')
        .then(()=>{
            console.log('DB connected !');            
        })
        .catch((error)=>{
            console.log("error : "+ error);
        })
var http = require('http')
var server = http.createServer(app)
const io = sockeIO(server)
server.listen(3009,()=>{
    console.log('server started !');
})
app.get('/users/create/', function(req, res, next) {
    res.render('form', { title: 'Page du Formulaire' });
});
