/**
 * This module routes any URL that starts with: '../api/users/'
 */

var userHandler = require('../handlers/userHandler.js');

function addUser(req, res, next){
    if(req.body.user !== undefined){
        userHandler.addUser(req.body.user, function(err, user){
            if(err){
                next(err);
            } else{
                res.send(user);
            }
        });
    } else {
        next(new Error("user field is undefined"));
    }
}


function getUsers(req, res, next){
    userHandler.getUsers(function(err, users){
        if(err){
            next(err);
        } else{
            res.send(users);
        }
    });
}


module.exports = {
    addUser,
    getUsers
};