'use strict';
const validatorsUtil = require('../../../utils/validatorsUtil.js');

//validate that meal is valid before adding meal to the db
function validateCreateMeal(req,res,next){
    req.check('meal', "meal doesn't exists").exists(),
    req.check('meal.name').custom(name => {
        if (!validatorsUtil.checkField(name)) {
            throw new Error('name invalid');
          } else{
            return true;
        }
    }),
    req.check('meal.price').custom(price => {
        if (!validatorsUtil.isPositive(price)) {
            throw new Error('price is not a positive number');
          } else{
            return true;
        }
    }),
    req.check('meal.quantity').custom(quantity => {
        if (!validatorsUtil.isPositive(quantity)) {
            throw new Error('quantity price is not a positive number');
          } else{
            return true;
        }
    }),
    req.check('meal.sides').custom(sides => {
        if (!validNumbersOfSides(sides)) {
            throw new Error('you can add only one sides to the meal');
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

function validNumbersOfSides(sides){
    if(sides.length <= 1){
        return true;
    } else{
        return false;
    }
}


module.exports = {
    validateCreateMeal
};