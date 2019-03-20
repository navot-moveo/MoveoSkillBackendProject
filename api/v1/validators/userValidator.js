'use strict';
var userHandler = require('../handlers/userHandler.js');
const validatorsUtil = require('../../../utils/validatorsUtil.js');

function ValiditeDataToUpdate(req, res, next){
    if(req.body.password !== undefined){
        next(new Error("can't change password"));
    } else{
        next();
    }
}

//validate that user is valid before adding user to the db
function validateCreateUser(req,res,next){
    req.check('user', "user doesn't exists").exists(),
    req.check('user.full_name').custom(fullName => {
        if (!validatorsUtil.checkField(fullName)) {
            throw new Error('full name invalid');
          } else{
            return true;
        }
    }),
    req.check('user.phone_number',"phone number is invalid").isNumeric()
    var errors = req.validationErrors();
    if(errors) {
        next(validatorsUtil.convertErrorsToArray(errors));
    }else{
        next();
    }
}

function validateUserTokenById(req, res, next){
    if(req.token === undefined){
         next(err);
    }else if(req.body.user_id !== undefined ){
        userHandler.findUserById(user_id,{},function(err, user){
            if(user.token !== req.token){
                next(new Error("invalid token. token doesn't match user token"));
            }
        })
    } else if(req.params.id !== undefined ){
        userHandler.findUserById(req.params.id,{},function(err, user){
            if(user.token !== req.token){
                next(new Error("invalid token. token doesn't match user token"));
            }
        })
    } else{
        next(new Error("invalid request. user_id field or id  param are undefined"))
    }
    
}


module.exports = {
    ValiditeDataToUpdate,
    validateCreateUser,
    validateUserTokenById
};