'use strict';
const validatorsUtil = require('../../../utils/validatorsUtil.js');

//validate that dish is valid before adding dish to the db
function validateCreateDish(req,res,next){
    req.check('dish', "dish doesn't exists").exists(),
    req.check('dish.name').custom(name => {
        if (!validatorsUtil.checkField(name)) {
            throw new Error('name invalid');
          } else{
            return true;
        }
    }),
    req.check('dish.price').custom(price => {
        if (!validatorsUtil.isPositive(price)) {
            throw new Error('price is not a positive number');
          } else{
            return true;
        }
    });
    var errors = req.validationErrors();
    if(errors) {
        next(convertErrorsToArray(errors));
    }else{
        next();
    }
}



module.exports = {
    validateCreateDish
};