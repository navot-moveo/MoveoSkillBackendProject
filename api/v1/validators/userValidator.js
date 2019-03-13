'use strict';
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


module.exports = {
    ValiditeDataToUpdate,
    validateCreateUser
};