/**
 * This module routes any URL that starts with: '../api/restaurants/'
 */
'use strict';
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

function getRestaurantsSortedBy(req, res, next){
    restaurantHandler.getAllRestaurantsSortedBy(req.query.sortField, req.query.param, function(err, restaurant){
        if(err){
            next(err);
        } else{
            res.send(restaurant);
        }
    });
}

function getAllRestaurants(req, res, next){
    restaurantHandler.getRestaurants(function(err, restaurant){
        if(err){
            next(err);
        } else{
            res.send(restaurant);
        }
    });
}

module.exports = {
    addRestaurant,
    getAllRestaurants,
    getRestaurantsSortedBy
};

