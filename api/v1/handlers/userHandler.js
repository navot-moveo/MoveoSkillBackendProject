var mongoose = require('mongoose');
var User = require('../../../db/models/userModel.js');

function addUser(user, callback){
    var newUser = new User(userToJson(user));
    newUser.save(function(err, user){
        if (err){
            callback(err);
        } else {
            callback(null, user);
        }
    });
}

function getUsers(callback){
    User.find({},function(err, users){
        if(err){
            callback(err);
        } else{
            callback(null, users);
        }
    });
}


function userToJson(user){
    var jsonUser = 
    {
        full_name: user.full_name,
        address: user.address,
        phone_number: user.phone_number,
        password: user.password
    }
    return jsonUser;   
};


module.exports = {
    addUser,
    getUsers
};