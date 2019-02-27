/**
 * This module routes any URL that starts with: '../api/restaurants/'
 */

var restaurantHandler = require('../handlers/restaurantHandler.js');

function addRestaurant(req, res, next){
    restaurantHandler.addRestaurant(req.body.restaurant, function(err, restaurant){
        if(err){
            next(err);
        } else{
            res.send(restaurant);
        }
    });
}

module.exports = {
    addRestaurant
};

