var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ordinateur = new Schema({
    model: String,
    category: String,
    dateFabrication: Date,
    prix: Number
});

module.exports = mongoose.model('ordinateurs', Ordinateur);