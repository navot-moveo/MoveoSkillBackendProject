var mongoose = require('mongoose');
var User = require('../../../db/models/userModel.js');
var Meal = require('../../../db/models/mealModel.js');
var Dish = require('../../../db/models/dishModel.js');
var Order = require('../../../db/models/orderModel.js');

function addUser(user, callback){
    var newUser = new User(userToJson(user));
    newUser.save(function(err, user){
        if (err){
            callback(err);
        } else {
            callback(null, user);
        }
    });
}

function findUserByUniqueField(uniqueField, valueOfField, projectObject, callback){
    if(projectObject === undefined){
        projectObject = {};
    }
    var query = {};
    query[`${uniqueField}`] = valueOfField;
    User.findOne(query, projectObject)
    .populate({path:'shopping_bag',select:'-_id' ,model: 'Meal' })
    .exec(function(err, user){
        if(err){
            callback(err);
        } else{
            callback(null, user);
        }
    })
}

//this method find user by id and populate shopping bag
function findUserById(userId, projectObject, callback){
    var query = {};
    query['_id'] = userId;
    User.findOne(query, projectObject, function(err, user){
        if(err){
            callback(err);
        } else{
            if(user !== null){
                callback(null, user);
            } else{
                callback(new Error("couldn't find user by id"));
            }
            
        }
    });
}

//for now user can only change the username
function updateUserData(userDataToUpdate, uniqueField, uniqueFieldValue, callback){
    if(userDataToUpdate === undefined){
        callback(new Error("Couldn't update user."));
    } else {
        var query = {};
        query[`${uniqueField}`] = uniqueFieldValue;
        User.findOne(query, function(err, user){
          if(err || (user === null)) {
            callback(new Error("Couldn't find user in data base."));
            } else {
                user = updateUser(user, userDataToUpdate);
                User.findOneAndUpdate(query, {$set:user}, {new: true}, function (err, user) {
                    if(err) {
                        callback(new Error("Couldn't update user to data base."));
                    } else {
                        callback(null,user);
                    }
                });
            }
        });
    }
}

function findByIdAndUpdateUser(userId, dataToUpdate, callback){
    var query = {};
    query['_id'] = userId;
    dataToUpdate = {$set:dataToUpdate};
    User.findOneAndUpdate(query, dataToUpdate, {new: true}, function(err, user){
        if(err){
            callback(err);
        } else{
            if(user !== null){
                callback(null, user);
            } else{
                callback(new Error("couldn't find user by id"));
            }
            
        }
    });
}

//this method validate that the price of the meal equal to the dish price and add the meal to the db
function addMeal(meal, callback){
    var newMeal = new Meal(mealToJson(meal));
    var query = {};
    query['_id'] = newMeal.dish_id;
    Dish.findOne(query, (err, dish) => {
        //errors while searching the dih in the db
        if(err) callback(err);
        if(dish === null) callback(new Error("couldn't find the dish in the data base"));
        else { //we found the dish
            if(dish.price === newMeal.price){
                newMeal.save(function(err, meal){
                    if (err){
                        callback(err);
                    } else {
                        callback(null, meal);
                    }
                });
            } else{
                callback(new Error("price of the meal is not equal to the price in the menu"));
            }
        }
    })
}

function updateShoppingBag(mealToAdd,mealObjectId, callback){
    if(mealToAdd === undefined){
        callback(new Error("Couldn't update shopping bag."));
    } else {
        var query = {};
        query['_id'] = mealToAdd.user_id;
        User.findOne(query, function(err, user){
          if(err || (user === null)) {
            callback(new Error("Couldn't find user in the data base."));
            } else {
                //this is the shoping bag we want to update in the db
                user.shopping_bag = user.shopping_bag.push(mealObjectId);
                User.findOneAndUpdate(query, {$set:user}, {new: true})
                .populate({path:'shopping_bag', model: 'Meal' })
                .exec( function (err, user) {
                    if(err) {
                        callback(new Error("Couldn't update user shopping bag to the data base."));
                    } else {
                        //todo change to user shopping bag
                        callback(null,user);
                    }
                });
            }
        });
    }
}

function addOrder(order, callback){
    var newOrder = new Order(orderToJson(order));
    newOrder.save(function(err, order){
        if (err){
            callback(err);
        } else {
            callback(null, order);
        }
    });
}

///--------------------helper methods--------------------///
function updateUser(user, update){
    var updateJson = userToJson(update);
    var userJson = userToJson(user);
    for (var key in update) {
        if (userJson.hasOwnProperty(key)) {
            userJson[`${key}`] = updateJson[`${key}`];
        }
    }
    return userJson;
}

function userToJson(user){
    var jsonUser = 
    {
        full_name: user.full_name,
        email: user.email,
        address: user.address,
        phone_number: user.phone_number,
        password: user.password
    }
    return jsonUser;   
};

function sumShoppingBag(shoppingBag){
    var shoppingBagJson = shoppingBag.shopping_bag;
    var sum = 0;
    for (var i = 0; i < shoppingBagJson.length; i++) {
        sum += shoppingBagJson[i].total_price;
    }
    return sum;
}

function orderToJson(order){
    var jsonOrder = {
        shopping_bag : order.shopping_bag,
        total_price : order.totalPrice,
        user_id : order._id
    }
    return jsonOrder;
}
function mealToJson(meal){
    var jsonMeal = 
    {
        name: meal.name,
        quantity: meal.quantity,
        changes: meal.changes,
        sides: meal.sides,
        price: meal.price,
        total_price: meal.price * meal.quantity,
        dish_id: meal.dish_id
    }
    return jsonMeal;   
};



module.exports = {
    addUser,
    findUserByUniqueField,
    updateUserData,
    findUserById,
    addMeal,
    updateShoppingBag,
    sumShoppingBag,
    addOrder,
    findByIdAndUpdateUser

};