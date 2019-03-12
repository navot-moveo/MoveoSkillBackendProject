/**
 * This module routes any URL that starts with: '../api/restaurants/'
 */
'use strict';
var restaurantHandler = require('../handlers/restaurantHandler.js');

function addRestaurant(req, res, next){
    if(req.body.restaurant !== undefined){
        restaurantHandler.addRestaurant(req.body.restaurant, function(err, restaurant){
            if(err){
                next(err);
            } else{
                res.send(restaurant);
            }
        });
    } else{
        new Error("restaurant field is undefined");
    }

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

function getRestaurantActionById(req,res,next){
    if(req.params.id !== undefined){
        restaurantHandler.getRestaurantActionById(req.params.id, req.query.action, function(err, restaurant){
            if(err){
                next(err);
            } else{
                res.send(restaurant);
            }
        });
    } else {
        next(new Error("id field is undefined"));
    }

}

function getAllRestaurantsCuisine(req,res,next){
    restaurantHandler.getAllRestaurantsCuisine(function(err, restaurant){
        if(err){
            next(err);
        } else{
            res.send(restaurant);
        }
    }); 
}

function searchRestaurant(req,res,next){
    var query = req.query.q;
    restaurantHandler.searchRestaurant(query, req.query.searchField, function(err, restaurant){
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
    getRestaurantsSortedBy,
    getRestaurantActionById,
    getAllRestaurantsCuisine,
    searchRestaurant
};

