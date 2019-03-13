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

//this method add order to the db
//this method expect to get the exact order to add to the db
function addOrder(req, res, next){
    if(req.body.order !== undefined){
        userHandler.addOrder(req.body.order, function(err, order){
            if(err){
                next(err);
            } else{
                res.locals['order'] = order;
                next();
            }
        });
    } else {
        next(new Error("order field is undefined"));
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

//find user by id 
function getUserDetailsById(req, res, next){
    var projectObject = {email:0, shopping_bag:0};
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
///------methods relate to authenticate stage-----------/////

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
                userShoppingBag['total_price'] = totalPrice;
                res.send(userShoppingBag);
            }            
        }
    });
}

//this method combines verify token and update user date
//for update we have to enter the unique field - for now email
function verifyAndUpdateUser(req,res,next){
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            var uniqueFieldValue = req.body[`${uniquField}`];
            userHandler.findByUniqueFieldAndUpdateUserData(req.body, uniquField, uniqueFieldValue, function(err, user){
                if(err) next(err)
                else{
                    res.send(user);
                }
            });
        }
    })
}

//this method update the shopping bag of a user
function updateShoppingBag(req, res, next){
    var mealObjectId = res.locals["meal_id"];
    userHandler.updateShoppingBag(req.body.meal, mealObjectId, function(err, user){
        if(err) {
            //if we couldn't update the shopping bag we want to delete the meal we added
            userHandler.deleteMealById(mealObjectId, function(deleteErr, deletedMeal){
                if(deleteErr){
                    next(new Error("couldn't update shopping bag, and couldn't delete meal from db"));
                } else{
                    next(err);
                }
            })          
        }
        else{
            res.send(user);
        }
    }); 
}

//reset the shopping bag after making an order
function resetUserShoppingBag(req, res, next){
    //the _id of the shopping bag  is the user id
    var userId = res.locals['order'].user_id;
    var uniqueFieldValue = req.body[`${uniquField}`];
    userHandler.findByIdAndUpdateUser(userId, {shopping_bag : []}, function(err, user){
        if(err) next(err)
        else{
            res.send(user);
        }
    });
}

////----------helper methods-------------/////
//TODO move to userUtil
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
    getUserShoppingBag,
    addOrder,
    resetUserShoppingBag
};