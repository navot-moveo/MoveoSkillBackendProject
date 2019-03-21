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
    restaurantHandler.getAllRestaurantsSortedBy(req.query.sortField, req.query.param, function(err, restaurants){
        if(err){
            next(err);
        } else{
            if(restaurants.length === 0){
                res.send("we didnt found any " + req.query.sortField + " reastaurants.");
            } else{
                res.send(restaurants);
            } 
        }
    });
}

function getAllRestaurants(req, res, next){
    restaurantHandler.getRestaurants(function(err, restaurants){
        if(err){
            next(err);
        } else{
            res.send(restaurants);
        }
    });
}

function getRestaurantActionById(req,res,next){
    if(req.params.id !== undefined){
        restaurantHandler.getRestaurantActionById(req.params.id, req.query.action, req.query.param, function(err, restaurant){
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
    restaurantHandler.searchRestaurant(query, function(err, restaurant){
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

