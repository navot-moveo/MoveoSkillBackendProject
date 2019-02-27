var mongoose = require('mongoose');
var Restaurant = require('../../../db/models/restaurantModel.js');

function addRestaurant(restaurant, callback){
    var newRestaurant = new Restaurant(restaurantToJson(restaurant));
    newRestaurant.save(function(err, restaurant){
        if (err){
            callback(err);
        } else {
            callback(null, restaurant);
        }
    });
}

function restaurantToJson(restaurant){
    var jsonRestaurant = 
    {
        name: restaurant.name,
        chef: restaurant.chef,
        couisine: restaurant.couisine,
        openingHours: restaurant.openingHours,
        address: restaurant.address,
        phone: restaurant.phone,
        dishes: restaurant.dishes
    }
    return jsonRestaurant;   
}

module.exports = {
    addRestaurant
};

