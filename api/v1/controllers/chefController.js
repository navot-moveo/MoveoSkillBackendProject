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
        chefHandler.getChefById(req.params.id, function(err, chef){
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

function getChefs(req, res, next){
    chefHandler.getChefs(function(err, chefs){
        if(err){
            next(err);
        } else{
            res.send(chefs);
        }
    });
}

module.exports = {
    addChef,
    getChefById,
    getChefs
};
