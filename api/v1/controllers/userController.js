/**
 * This module routes any URL that starts with: '../api/users/'
 */
var userHandler = require('../handlers/userHandler.js');
const jwt = require('jsonwebtoken');
const secretKey = 'secret';
const authUtil = require('../../../utils/authUtil.js');
const uniquField = 'email';

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

//find user by id - unique field
function getUserDetailsById(req, res, next){
    var projectObject = {email:0};
    if(req.params.id !== undefined){
        userHandler.findUserById(req.params.id, projectObject, function(err, user){
            if(err){
                next(err);
            } else{
                res.send(user);
            }
        });
    } else{ 
        next(new Error("id field is undefined"));
    }
}
//this method sign user and send the token of the user
function signUser(req,res,next){
    //first param is the payload, second param is the privatekey
    //async - this token will be valid for 3h
    jwt.sign({user:res.locals["userData"]}, secretKey, {expiresIn: '3h' }, (err, token) => {
        if(err) throw err;
        var userToSend = res.locals["userData"]
        userToSend.token = token
        res.send(userToSend);
    });
}

//this method checks if the user is in the db(depends on unique field - full_name) and validate that the password is valid 
function authenticate(req, res, next) {
    const uniquFieldValue = req.body[`${uniquField}`];
    userHandler.findUserByUniqueField(uniquField, uniquFieldValue,{}, (err, user) => {
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

function verifyToken(req, res, next){
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            next();
        }
    })
}


///-------------protected routes---------///
//if quantity query param is true then give the size of the shoppingBag
//else gives the shoppibg bag details including sum of shopping bag
function getUserShoppingBag(req, res, next){
    var projectObject = {shopping_bag : 1};
    const uniquFieldValue = req.body[`${uniquField}`];
    userHandler.findUserByUniqueField(uniquField, uniquFieldValue, projectObject, function(err, userShoppingBagDoc){
        if(err){
            next(err);
        } else{
            const userShoppingBag = userShoppingBagDoc.toObject()
            if(getBoolean(req.query.quantity) === true){
                var sizeOfShoppingBag = {
                    size : userShoppingBag.shopping_bag.length
                }
                res.send(sizeOfShoppingBag);
            } else {
                const totalPrice = userHandler.sumShoppingBag(userShoppingBag);
                userShoppingBag['totalPrice'] = totalPrice;
                res.send(userShoppingBag);
            }            
        }
    });
}
//this method combines verify token and update user date
function verifyAndUpdateUser(req,res,next){
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            var uniqueFieldValue = req.body[`${uniquField}`];
            userHandler.updateUserData(req.body, uniquField, uniqueFieldValue, function(err, user){
                if(err) next(err)
                else{
                    res.send(user);
                }
            });
        }
    })
}

//this method add meal to the meals collection
function addMeal(req, res, next){
    if(req.body.meal !== undefined){
        userHandler.addMeal(req.body.meal, function(err, meal){
            if(err){
                next(err);
            } else{
                res.locals["meal_id"] = meal._id;
                next();
            }
        });
    } else {
        next(new Error("meal field is undefined"));
    }
}

//this method update the shopping bag of a user
function updateShoppingBag(req, res, next){
    var mealObjectId = res.locals["meal_id"];
    userHandler.updateShoppingBag(req.body.meal, mealObjectId, function(err, user){
        if(err) next(err)
        else{
            res.send(user);
        }
    }); 
}


////----------helper methods-------------/////
function getBoolean(value){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
             return true;
         default: 
             return false;
     }
 }

module.exports = {
    addUser,
    signUser,
    authenticate,
    verifyAndUpdateUser,
    getUserDetailsById,
    verifyToken,
    updateShoppingBag,
    addMeal,
    getUserShoppingBag
};