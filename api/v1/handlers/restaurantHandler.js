'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var Restaurant = require('../../../db/models/restaurantModel.js');
var restaurantUtil = require('../../../utils/restaurantUtil.js');
var DishCatagory = require('../../../db/models/dishCatagoryModel.js');

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

//this method gives all the restaurant of a specific chef by id
function getAllSpecificChefRestaurants(chefId, callback){
    console.log('');
    Restaurant.aggregate([
        { $match: { chef: mongoose.Types.ObjectId(chefId) } },
        { $project : { _id: 0 , imagesUrl : 1, name:1 }} 
    ], function (err, restaurants) {
        if (err) {
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
        case 'chef':
        getAllSpecificChefRestaurants(param, callback);
        break;
        default:
        getAllRestaurants(callback);
        break;
    }
}

//this method returns the restaurant dishes sorted by catagory
function getRestaurantProfileById(restaurantId, callback){
    var query = {};
    query['_id'] = restaurantId;
    Restaurant.findOne(query,'dishes name imagesUrl chef')
    .populate([{
        path: 'dishes',
        select:'-sides -changes',
        populate:[{
            path:'icons',
            select:'name imageUrl'
        },{
            path:'catagory',
            select:'name'
        }]
    },
    {
        path:'chef',
        select:'name'
    }])
    .exec(function(err, restaurant){
        var dishesArray = restaurant.dishes;
        dishesArray.sort(restaurantUtil.predicateBy("catagory"));
        restaurant.dishes = dishesArray;
        if(err){
            callback(err);
        } else{
            callback(null, restaurant);
        }
    });
}

//get the opening hours and about of a specific restaurant
function getRestaurantInfoById(restaurantId, callback){
    var query = {};
    query['_id'] = restaurantId;
    Restaurant.findOne(query,'openingHours about', function(err, restaurant){
        if(err){
            callback(err);
        } else{
            callback(null, restaurant);
        }
    })
}

//this method returns all the info about a restaurant
function getRestaurantById(restaurantId, callback){
    var query = {};
    query['_id'] = restaurantId;
    Restaurant.findOne(query)
    .populate({
        path: 'dishes',
        populate:[{
            path:'icons'
        },
        {
            path:'catagory'
        }]
    })
    .exec(function(err, restaurant){
        if(err){
            callback(err);
        } else{
            callback(null, restaurant);
        }
    });
}
//this method select the action to do on a specific restaurant
function getRestaurantActionById(id, action, callback){
    switch(action){
        case 'info':
        getRestaurantInfoById(id, callback);
        break;
        case 'profile':
        getRestaurantProfileById(id, callback);
        break;
        case 'menu':
        getRestaurantMenu(id, callback);
        break;
        default:
        getRestaurantById(id, callback);
        break;
    }
}

function getRestaurantMenu(restaurantId, callback){
    var query = {};
    query['restaurant_id'] = restaurantId;
    DishCatagory.find(query, 'name',function(err, menu){
        if(err){
            callback(err);
        } else{
            callback(null, menu);
        }
    })
}

//this method returns all the cuisines in the app
function getAllRestaurantsCuisine(callback){
    Restaurant.find().distinct('cuisine',function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        }
    })
};

function searchRestaurant(q, searchField, callback){
    var regex = new RegExp('^' + q +'| ' + q);
    const query = {}
    query[`${searchField}`] = {$regex: regex, $options:'i'};
    //{searchField: {$regex: regex, $options:'m'}}
    Restaurant.find(query, function(err, restaurants){
        if(err){
            callback(err);
        } else{
            callback(null, restaurants);
        } 
    })
}

///---------------helper methods------------///
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
    getAllSpecificCuisineRestaurants,
    getRestaurantActionById,
    getAllRestaurantsCuisine,
    searchRestaurant
};

