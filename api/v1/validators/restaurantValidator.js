'use strict';

function validateCreateRestaurant(req,res,next){
    req.check('restaurant.name', "name doesn't exists").exists(),
    req.check('restaurant.chef', "chef doesn't exists").exists(),
    req.check('restaurant.cuisine',"cuisine doesn't exists").exists(),
    req.check('restaurant.openingDate',"opening date doesn't exists").exists(),
    req.check('restaurant.openingDate',"opening date is after today").isBefore()
    req.check('restaurant.rating',"rating is invalid value").isInt()
    var errors = req.validationErrors();
    if(errors) {
        next(convertErrorsToArray(errors));
    }else{
        next();
    }
}

function convertErrorsToArray(errors){
    var errArray = [];
    for (let index = 0; index < errors.length; index++) {
        const errMsg = errors[index].msg;
        errArray.push(errMsg);
    }
    console.log(errArray);
    return errArray;
}


module.exports = {
    validateCreateRestaurant
};