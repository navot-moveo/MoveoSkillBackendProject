/**
 * This module routes any URL that starts with: '../api/chefs/'
 */

var chefHandler = require('../handlers/chefHandler.js');

function addChef(req, res, next){
    chefHandler.addChef(req.body.chef, function(err, chef){
        if(err){
            next(err);
        } else{
            res.send(chef);
        }
    });
}

module.exports = {
    addChef
};
