'use strict';
const validatorsUtil = require('../../../utils/validatorsUtil.js');

//validate that chef is valid before adding chef to the db
function validateCreateChef(req,res,next){
    req.check('chef', "chef doesn't exists").exists(),
    req.check('chef.name').custom(name => {
        if (!validatorsUtil.checkField(name)) {
            throw new Error('name invalid');
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
    validateCreateChef
};