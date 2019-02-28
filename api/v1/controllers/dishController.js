/**
 * This module routes any URL that starts with: '../api/dishes/'
 */

var dishHandler = require('../handlers/dishHandler.js');

function addDish(req, res, next){
    dishHandler.addDish(req.body.dish, function(err, dish){
        if(err){
            next(err);
        } else{
            res.send(dish);
        }
    });
}

module.exports = {
    addDish
};