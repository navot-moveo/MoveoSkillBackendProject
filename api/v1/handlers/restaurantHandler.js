'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var Restaurant = require('../../../db/models/restaurantModel.js');
var restaurantUtil = require('../../../utils/restaurantUtil.js');
var DishCatagory = require('../../../db/models/dishCatagoryModel.js');


//this method add restaurant to the db
function addRestaurant(restaurant, callback){
    var newRestaurant = new Restaurant(restaurantToJson(restaurant));
    newRestaurant.save(callback);
}
//this method get all the restaurant from the db
function getAllRestaurants(callback){
    Restaurant.find({},'name chef imagesUrl')
    .populate('chef', 'name')
    .exec(callback)   
}

//now this method decided that new restaurant is 14 days from today
function getNewRestaurants(callback){
    //this number is in days
    var periodDefineNewRestaurant = 14;
    var startDateForNewRestaurant = moment().subtract(periodDefineNewRestaurant, 'days').valueOf();
    Restaurant.find( {"openingDate": {"$gte": startDateForNewRestaurant}} ,'name chef openingDate imagesUrl')
    .populate('chef', 'name')
    .exec(callback);
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
    .exec(callback); 
}

//returns all the restaurant that open now

function getOpenRestaurants(callback) {
    // TODO : how to create a nested query using find
   var dayOfToday = convertNumToDay(moment().day());
   var hourOfToday = moment().hour();
    const query = { 
        [`openingHours.${dayOfToday}.open`]: { "$lte" : parseInt(hourOfToday) }, 
        [`openingHours.${dayOfToday}.close`]: { "$gte" : parseInt(hourOfToday) } 
    } 
    Restaurant.find(query ,`name chef openingHours.${dayOfToday}`).populate('chef', 'name')
    .exec(callback);
}


//returns all the restaurant from a specific cuisine
function getAllSpecificCuisineRestaurants(typeOfCuisine, callback){
    var query = {};
    query["cuisine.name"] = typeOfCuisine
    Restaurant.find(query,'name chef cuisine imagesUrl')
    .populate('chef', 'name')
    .exec(callback);
}

//this method gives all the restaurant of a specific chef by id
function getAllSpecificChefRestaurants(chefId, callback){
    Restaurant.aggregate([
        { $match: { chef: mongoose.Types.ObjectId(chefId) } },
        { $project : { _id: 0 , imagesUrl : 1, name:1 }} 
    ], callback);
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
        if(param !== undefined){
            getAllSpecificCuisineRestaurants(param, callback);
        }  else {
            getAllRestaurants(callback);
        }
        break;
        case 'chef':
        if(param !== undefined){
            getAllSpecificChefRestaurants(param, callback);
        } else {
            getAllRestaurants(callback);
        }
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
    Restaurant.findOne(query,'openingHours about', callback);
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
    .exec(callback);
}

//this method select the action to do on a specific restaurant
function getRestaurantActionById(id, action, param, callback){
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
        case 'open':
        isRestaurantOpen(id, callback);
        break;
        case 'dishes':
        getRestaurantDishes(id, callback);
        break;
        case 'edit':
        if(param !== undefined){
            addRestaurantDishes(id, param, callback);
        } else{
            getRestaurantById(id, callback); 
        }
        break;
        case 'dishCatagory':
        if(param !== undefined){
            getRestaurantSpecificCatagoryDishes(id, param, callback);
        } else{
            getRestaurantById(id, callback); 
        } 
        break;
        default:
        getRestaurantById(id, callback);
        break;
    }
}

function getRestaurantSpecificCatagoryDishes(restaurantId, dishCatagory, callback){
    getRestaurantDishes(restaurantId, function(err, restaurant){
        if(err) callback(err);
        else{
            var dishesByCatagory = getDishesByCatagory(restaurant, dishCatagory);
            callback(null, dishesByCatagory);
        }
    })
}

function addRestaurantDishes(restaurantId, dishId, callback){
    var query = {};
    var updateDishes = {};
    query['_id'] = restaurantId;
    Restaurant.findOne(query, function(err, restaurant){
        if(err){
            callback(err);
        } else{
            if(restaurant === null){
                callback(new Error("couldn't find restaurant and edit.")); 
            } else {
                restaurant.dishes.push(createObjectId(dishId));
                updateDishes['dishes'] = restaurant.dishes;
                Restaurant.findOneAndUpdate(query, updateDishes, {new: true}, function(err, restaurant){
                    if (err) callback(err);
                    else {
                        if(restaurant === null){
                            callback(new Error("couldn't find restaurant and edit.")); 
                        } else {
                        callback(null, restaurant);
                        }
                    }
                })                
            }          
        }
    })
}
//this method returns all the dishCatagories of a restaurand by id
function getRestaurantMenu(restaurantId, callback){
    var query = {};
    query['restaurant_id'] = restaurantId;
    DishCatagory.find(query, 'name',callback);
}

//this method returns all the dishes of a restaurand by id  sorted by catagory name
function getRestaurantDishes(restaurantId, callback){
    var query = {};
    query['_id'] = createObjectId(restaurantId);
    Restaurant.findOne(query, 'dishes')
    .populate({
        path:'dishes',
        select:'name ingredients price icons catagory',
        populate: {
            path: 'icons catagory'
        }
    })
    .exec(function(err, dishes){
        dishes = sortJsonArrayByField(dishes.dishes, 'catagory.name')
        if(err){
            callback(err);
        } else{
            callback(null, dishes);
        }
    });
}

//this method returns all the dishCatagories of a restaurand by id
function isRestaurantOpen(restaurantId, callback){
    var query = {};
    var today = convertNumToDay(moment(new Date()).day());  
    query['_id'] = restaurantId;
    Restaurant.findOne(query, function(err, restaurant){
        if(err){
            callback(err);
        } else{
            var openingHoursOfToday = restaurant.toObject().openingHours[`${today}`];
            callback(null, {isOpen: checkIfRestaurantOpen(openingHoursOfToday)});
        }
    })
}

//this method returns all the cuisines in the app
function getAllRestaurantsCuisine(callback){
    Restaurant.find().distinct('cuisine',function(err, restaurants){
        if(err){
            callback(err);
        } else {
                var allRestaurantObject = {
                    "name":"allRestaurants",
                    "imageUrl":"www.allRestaurants.com"
                }
                restaurants.push(allRestaurantObject);
                callback(null, restaurants);
        }  
    });
}

function searchRestaurant(q, callback){
    //TODO: build array in generic way
    var arrayOfSearchFields = ['cuisine','name','chef'];
    searchHelperRestaurant(q, arrayOfSearchFields, callback)
}



//this method is searching by restaurant, chef, cuisine
function searchHelperRestaurant(q, arrayOfSearchFields, callback){
    //this regex is support partial search of each word in the field
    var regex = new RegExp('^' + q +'| ' + q);
    var arrayOfQueries = [];
    //updatind the query field
    arrayOfQueries = buildSearchQuery(arrayOfSearchFields, regex);
    
    Restaurant.aggregate([
        {
            "$lookup": {
                "from": "chefs", //collection name
                let: { chef_id: "$chef" },//the value from restaurants collection
                pipeline: [
                    //$$ refers to let variabels, $ refers to chefs collection variables
                    { $match: { $expr:{ $eq: [ "$_id",  "$$chef_id" ] } } },
                    { $project: { name: 1, _id: 0 } }
                ],
                "as": "chef"
                }
        },
        {$unwind: '$chef'},
        { $match: { $or: arrayOfQueries } },
        { $project : { _id: 0 , imagesUrl : 1, name:1, chef:1, cuisine:1 }}
    ], callback);
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

function sortJsonArrayByField(jsonArray, fieldName){
    return jsonArray.sort(SortByCatagory);
}

function SortByCatagory(firstDish,secondDish) {
    return ((firstDish.catagory.name == secondDish.catagory.name) ? 0 : ((firstDish.catagory.name > secondDish.catagory.name) ? 1 : -1 ));
}

function getDishesByCatagory(arrayOfDishes, dishCatagory){
    var arrayOfDishesByCatagory = [];
    for(var i = 0; i <  arrayOfDishes.length; i++){
        var dishJson = arrayOfDishes[i].toObject();
        if(dishJson.catagory.name === dishCatagory){
            arrayOfDishesByCatagory.push(dishJson);
        }
    }
    return arrayOfDishesByCatagory; 
}
//this method checks is the restaurant is open right now
//if yes return json with value true, else return json with value false
function checkIfRestaurantOpen(openingHoursOfToday) {
    var hour = moment(new Date()).hour();
    if((12 <= openingHoursOfToday.open  && openingHoursOfToday.close <= 12)){
        openingHoursOfToday.close += 24;
        if(0 <= hour && hour < 12) {
            hour += 24;
        }
    }
    if(openingHoursOfToday.open <= hour && hour <= openingHoursOfToday.close){
        return true;
    } else {
        return false;
    }
}

//this method convert the search field to the the correct json field
function convertSearchFieldToJsonField(searchField){
    searchField = searchField.toLowerCase();
    if(searchField === 'chef'){
        searchField = 'chef.name';
    } else if(searchField === 'restaurant'){
        searchField = 'name';
    } else if(searchField === 'cuisine'){
        searchField = 'cuisine.name';
    }
    return searchField;
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

//this method helps to build all the queries of the search by fields feature
function buildSearchQuery(arrayOfSearchFields, regex){
    var arroyOfQueries = [];
    for(var i = 0; i < arrayOfSearchFields.length; i++){
        //convert the search field to the correct json field in the model
        var searchField = convertSearchFieldToJsonField(arrayOfSearchFields[i]);
        var query = {};
        query[`${searchField}`] = {$regex: regex, $options:'i'};
        arroyOfQueries.push(query);
    }
    return  arroyOfQueries;
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

