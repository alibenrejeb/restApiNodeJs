// n'oubliez pas npm install mongoose --save :)
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    mail: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', User);