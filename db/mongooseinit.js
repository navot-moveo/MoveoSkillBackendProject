'use strict';

var mongoose = require('mongoose');
/*
var config = require('config');

//taking the data from config/default.json
//var dbConfig = config.get("MongoDB.Configurations");

//var user = dbConfig.user;
var password = dbConfig.password;

if (typeof password === 'undefined' || password.length <= 0) {
    password = '';
} else {
    password = ':' + password + '@';
}
*/
//connecting to db
// example: mongoose.connect('mongodb://username:password@host:port/database')
mongoose.connect('mongodb://navot:pato@ec2-34-253-183-22.eu-west-1.compute.amazonaws.com:27017/foodDB');
//generic way to connect
//mongoose.connect('mongodb://' + user + password + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('DB connection success');
})

module.exports = {

};