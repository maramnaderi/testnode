var mongoose = require('mongoose')
var Schema = mongoose.Schema
var chat = new Schema({
    msg : String,
    date : Date,
})
module.exports = mongoose.model('chats', chat)