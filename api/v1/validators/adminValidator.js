'use strict';
const validatorsUtil = require('../../../utils/validatorsUtil.js');

//validate that dish is valid before adding dish to the db
function validateCreateAdmin(req,res,next){
    req.check('admin', "admin doesn't exists").exists(),
    req.check('admin.name').custom(name => {
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
    validateCreateAdmin
};