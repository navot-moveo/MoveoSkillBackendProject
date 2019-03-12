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

function findUser(uniqueField, valueOfField, callback){
    var query = {};
    query[`${uniqueField}`] = valueOfField;
    User.findOne(query, function(err, user){
        if(err){
            callback(err);
        } else{
            callback(null, user);
        }
    });
}

//for now user can only change the username
function updateUserData(userDataToUpdate, uniqueField, uniqueFieldValue, cb){
    if(userDataToUpdate === undefined){
        cb(new Error("Couldn't update user."));
    } else{
        var query = {};
        query[`${uniqueField}`] = uniqueFieldValue;
        User.findOne(query, function(err, user){
          if(err) {
                cb(new Error("Couldn't find user in data base."));
            } else {
              user = updateUser(user, userDataToUpdate);
              User.findOneAndUpdate(query, {$set:user}, {new: true}, function (err, user) {
                if(err) {
                    cb(new Error("Couldn't save user to data base."));
                  } else {
                    cb(null,user);
                }
              });
            }
        });
      }
  }
///--------------------helper methods--------------------///
function updateUser(user, update){
    var updateJson = userToJson(update);
    var userJson = userToJson(user);
    for (var key in update) {
        if (userJson.hasOwnProperty(key)) {
            userJson[`${key}`] = updateJson[`${key}`];
        }
    }
    return userJson;
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
    getUsers,
    findUser,
    updateUserData
};