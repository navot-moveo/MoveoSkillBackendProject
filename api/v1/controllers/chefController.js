/**
 * This module routes any URL that starts with: '../api/chefs/'
 */

var chefHandler = require('../handlers/chefHandler.js');

function addChef(req, res, next){
    if(req.body.chef !== undefined){
        chefHandler.addChef(req.body.chef, function(err, chef){
            if(err){
                next(err);
            } else{
                res.send(chef);
            }
        });
    } else {
        next(new Error("chef field is undefined"));
    }

}

function getChefById(req, res, next){
    if(req.params.id !== undefined){
        chefHandler.getChegById(req.params.id, function(err, chef){
            if(err){
                next(err);
            }else {
                res.send(chef);
            }
        });
    } else{
        next(new Error("id field is undefined"));
    }
}

module.exports = {
    addChef,
    getChefById
};
