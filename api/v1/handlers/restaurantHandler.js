'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
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
    Restaurant.find({},'name chef imagesUrl')
    .populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    });
}

//now this method decided that new restaurant is 14 days from today
function getNewRestaurants(callback){
    //this number is in days
    var periodDefineNewRestaurant = 14;
    var startDateForNewRestaurant = moment().subtract(periodDefineNewRestaurant, 'days').valueOf();
    Restaurant.find( {"openingDate": {"$gte": startDateForNewRestaurant}} ,'name chef openingDate imagesUrl')
    .populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    })
}

//now this method is limit to the most 5 popular and rating 7 and upper
function getPopularRestaurants(callback){
    var ratingOfPopularRestaurant = 7;
    Restaurant.find( {"rating": {"$gte": ratingOfPopularRestaurant}} ,'name chef rating imagesUrl',{
        limit:5, 
        sort:{
            rating: -1 //desc order
        }
    })
    .populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    }) 
}

//returns all the restaurant that open now
function getOpenRestaurants(callback) {
    // TODO : how to create a nested query using find
   var dayOfToday = convertNumToDay(moment().day());
   var hourOfToday = moment().hour();
    const query = { 
        [`openingHours.${dayOfToday}.open`]: { "$lte" : parseInt(hourOfToday) }, 
        [`openingHours.${dayOfToday}.close`]: { "$gte" : parseInt(hourOfToday)} 
    } 
    Restaurant.find(query ,`name chef openingHours.${dayOfToday}`).populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    })
}

//returns all the restaurant from a specific cuisine
function getAllSpecificCuisineRestaurants(typeOfCuisine, callback){
    var query = {};
    query["cuisine"] = typeOfCuisine
    Restaurant.find(query,'name chef cuisine imagesUrl')
    .populate('chef', 'name')
    .exec(function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    });
}

//this method decide how to sort the restaurants 
function getAllRestaurantsSortedBy(sortField, param, callback){
    switch(sortField){
        case 'new':
        getNewRestaurants(callback);
        break;
        case 'popular':
        getPopularRestaurants(callback);
        break;
        case 'open':
        getOpenRestaurants(callback);
        break;
        case 'cuisine':
        getAllSpecificCuisineRestaurants(param, callback);
        break;
        default:
        getAllRestaurants(callback);
        break;
    }
}

function convertNumToDay(num){
    var day = "";
    switch(num){
        case 0:
        day = "sunday";
        break;
        case 1:
        day = "monday";
        break;
        case 2:
        day = "tuesday";
        break;
        case 3:
        day = "wednesday";
        break;
        case 4:
        day = "thursday";
        break;
        case 5:
        day = "friday";
        break;
        case 6:
        day = "saturday";
        break;
    }
    return day;
}


//this method responsible to convert the data we get to a json that go into the db
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
        rating: restaurant.rating,
        imagesUrl: restaurant.imagesUrl,
        dishes: dishesToObjectIds(restaurant.dishes)
    }
    return jsonRestaurant;   
}

//convert  id String to objectId 
function createObjectId(id){
    if(id !== undefined){
        let objectId = new mongoose.Types.ObjectId(id);
        return objectId;
    } 
}

//convert array of id String to objectId array
function dishesToObjectIds(dishesArray){
    for (let index = 0; index < dishesArray.length; index++) {
        dishesArray[index] = new mongoose.Types.ObjectId(dishesArray[index]);     
    }
    return dishesArray;
}


module.exports = {
    addRestaurant,
    getAllRestaurants,
    getAllRestaurantsSortedBy,
    getAllSpecificCuisineRestaurants
};

