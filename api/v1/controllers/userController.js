/**
 * This module routes any URL that starts with: '../api/users/'
 */
var userHandler = require('../handlers/userHandler.js');
const jwt = require('jsonwebtoken');
const secretKey = 'secret';
const authUtil = require('../../../utils/authUtil.js');
const uniquField = 'full_name';

//this method add user to the db
function addUser(req, res, next){
    if(req.body.user !== undefined){
        userHandler.addUser(req.body.user, function(err, user){
            if(err){
                next(err);
            } else{
                res.locals["userData"] = user;
                next();
            }
        });
    } else {
        next(new Error("user field is undefined"));
    }
}

//this method get all users in the db
function getUsers(req, res, next){
    userHandler.getUsers(function(err, users){
        if(err){
            next(err);
        } else{
            res.send(users);
        }
    });
}
//this method sign user and send the token of the user
function signUser(req,res,next){
    //first param is the payload, second param is the privatekey
    //async - this token will be valid for 1h
    jwt.sign({user:res.locals["userData"]}, secretKey, {expiresIn: '1h' }, (err, token) => {
        if(err) throw err;
        var userToSend = res.locals["userData"]
        userToSend.token = token
        res.send(userToSend);
    });
}

//this method checks if the user is in the db(depends on unique field - full_name) and validate that the password is valid 
function authenticate(req, res, next) {
    const uniquFieldValue = req.body[`${uniquField}`];
    userHandler.findUser(uniquField, uniquFieldValue, (err, user) => {
        if (err) {
            //user doesn't exist -> can't login
            next(err);
        } else {
            //use exist-> compare plain password and hashed password       
            authUtil.comparePasswords(req.body.password, user.password, (err) => {
                if(err){
                    //password isn't correct
                    next(err);
                } else{
                    res.locals["userData"] = user;
                    next();
                }
            })
        }
    });
}


///-------------protected routes---------///
function verifyAndUpdateUser(req,res,next){
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            //todo make this generic
            var uniqueFieldValue = req.body[`${uniquField}`];
            userHandler.updateUserData(req.body, uniquField, uniqueFieldValue, function(err, user){
                if(err) next(err)
                else{
                    //validating that we doesn't send password to user
                    user.password = undefined;
                    res.send(user);
                }
            });
        }
    })
}
module.exports = {
    addUser,
    getUsers,
    signUser,
    authenticate,
    verifyAndUpdateUser
};