/**
 * This module routes any URL that starts with: '../api/dishes/'
 */

var dishHandler = require('../handlers/dishHandler.js');

function addDish(req, res, next){
    if(req.body.dish !== undefined){
        dishHandler.addDish(req.body.dish, function(err, dish){
            if(err){
                next(err);
            } else{
                res.send(dish);
            }
        });
    } else{
        next(new Error("dish field is undefined"));
    }

}

function getDishById(req, res, next){
    if(req.params.id !== undefined){
        dishHandler.getDishById(req.params.id, function(err, dish){
            if(err){
                next(err);
            }else {
                res.send(dish);
            }
        });
    } else{
        next(new Error("id field is undefined"));
    }
}

module.exports = {
    addDish,
    getDishById
};