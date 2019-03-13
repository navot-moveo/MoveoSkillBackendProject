'use strict';
const validatorsUtil = require('../../../utils/validatorsUtil.js');

function validateCreateRestaurant(req,res,next){
    req.check('restaurant', "restaurant doesn't exists").exists(),
    req.check('restaurant.name', "name doesn't exists").exists(),
    req.check('restaurant.name').custom(name => {
        if (!validatorsUtil.checkField(name)) {
            throw new Error('name is invalid');
          } else{
            return true;
        }
    });
    req.check('restaurant.chef', "chef doesn't exists").exists(),
    req.check('restaurant.cuisine',"cuisine doesn't exists").exists(),
    req.check('restaurant.openingDate',"opening date doesn't exists").exists(),
    req.check('restaurant.phone',"phone number is invalid").isNumeric(),
    req.check('restaurant.openingDate',"opening date is after today").isBefore(),
    req.check('restaurant.rating',"rating is invalid value").isInt(),
    req.check('restaurant.rating').custom(rating => {
        if (!validatorsUtil.isPositive(rating)) {
            throw new Error('rating is not a positive number');
          } else{
            return true;
        }
    });
    var errors = req.validationErrors();
    if(errors) {
        next(validatorsUtil.convertErrorsToArray(errors));
    }else{
        next();
    }
}




module.exports = {
    validateCreateRestaurant
};