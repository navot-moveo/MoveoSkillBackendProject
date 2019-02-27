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

function getRestaurants(restaurant, callback){
    Restaurant.find()
    .populate('chef', 'name')
    .populate('dishes', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    });
}




function restaurantToJson(restaurant){
    var jsonRestaurant = 
    {
        name: restaurant.name,
        chef: new mongoose.Types.ObjectId(restaurant.chef),
        couisine: restaurant.couisine,
        openingHours: restaurant.openingHours,
        address: restaurant.address,
        phone: restaurant.phone,
        dishes: dishesToObjectIds(restaurant.dishes)
    }
    return jsonRestaurant;   
}

function dishesToObjectIds(dishesArray){
    for (let index = 0; index < dishesArray.length; index++) {
        dishesArray[index] = new mongoose.Types.ObjectId(dishesArray[index]);     
    }
    return dishesArray;
}


module.exports = {
    addRestaurant,
    getRestaurants
};

