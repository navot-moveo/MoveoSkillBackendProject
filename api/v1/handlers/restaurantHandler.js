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

function getAllRestaurants(callback){
    Restaurant.find({},'name chef imageUrl')
    .populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    });
}

function getNewRestaurants(callback){

}

function getPopularRestaurants(callback){
    
}

function getOpenRestaurants(callback){
    
}

function getCuisineRestaurants(cuisine, callback){
    
}




function restaurantToJson(restaurant){
    var jsonRestaurant = 
    {
        name: restaurant.name,
        chef: createObjectId(restaurant.chef),
        cuisine: restaurant.cuisine,
        openingHours: restaurant.openingHours,
        openingDate: new Date(restaurant.openingDate),
        address: restaurant.address,
        phone: restaurant.phone,
        about: restaurant.about,
        imagesUrl: restaurant.imagesUrl,
        dishes: dishesToObjectIds(restaurant.dishes)
    }
    return jsonRestaurant;   
}

function createObjectId(id){
    if(id !== undefined){
        let objectId = new mongoose.Types.ObjectId(id);
        return objectId;
    } 
}



function dishesToObjectIds(dishesArray){
    for (let index = 0; index < dishesArray.length; index++) {
        dishesArray[index] = new mongoose.Types.ObjectId(dishesArray[index]);     
    }
    return dishesArray;
}


module.exports = {
    addRestaurant,
    getAllRestaurants,
    getNewRestaurants,
    getPopularRestaurants,
    getOpenRestaurants,
    getCuisineRestaurants
};

