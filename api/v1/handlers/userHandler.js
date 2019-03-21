var mongoose = require('mongoose');
var User = require('../../../db/models/userModel.js');
var Meal = require('../../../db/models/mealModel.js');
var Dish = require('../../../db/models/dishModel.js');
var Order = require('../../../db/models/orderModel.js');
//for support mails
const adminMail = "navot@moveo.co.il";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var fs = require('fs');
var termsOfUsePathFile = '/Users/navotslavin/Desktop/moveo/MoveoSkillBackendProject/txtFiles/termsOfUse.txt';


//this method add user 
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

//this method add order 
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
                newMeal.imageUrl = dish.imageUrl;
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

function deleteMealById(mealObjectId, callback){
    var query = {};
    //query['_id'] = mealObjectId;
    Meal.findByIdAndRemove(mealObjectId, function(err, deletedMeal){
        if(err) callback(err);
        else{
            callback(null, deletedMeal);
        }
    })
}

//this method find user by unique field and populate shopping bag
function findUserByUniqueField(uniqueField, valueOfField, projectObject, callback){
    if(projectObject === undefined){
        projectObject = {};
    }
    var query = {};
    query[`${uniqueField}`] = valueOfField;
    User.findOne(query, projectObject)
    .populate({path:'shopping_bag',select:'-_id -updatedAt -createdAt -dish_id' ,model: 'Meal' })
    .exec(function(err, user){
        if(err){
            callback(err);
        } else{
            if(user !== null){
                callback(null, user);
            } else{
                callback(new Error("couldn't find user by unique field"));
            }
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

function findByUniqueFieldAndUpdateUserData(userDataToUpdate, uniqueField, uniqueFieldValue, callback){
    if(userDataToUpdate === undefined){
        callback(new Error("Couldn't update user."));
    } else {
        var query = {};
        query[`${uniqueField}`] = uniqueFieldValue;
        User.findOneAndUpdate(query,{$set:userDataToUpdate} , {new: true}, function(err, user){
        if(err || (user === null)) {
            callback(new Error("Couldn't find user in data base."));
            } else {
                callback(null,user);
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

function updateShoppingBag(mealToAdd,mealObjectId, callback){
    if(mealToAdd === undefined){
        callback(new Error("Couldn't update shopping bag."));
    } else {
        var query = {};
        query['_id'] = mealToAdd.user_id;
        //to get the current shopping bag
        User.findOne(query, function(err, user){
          if(err || (user === null)) {
            callback(new Error("Couldn't find user in the data base."));
            } else {
                //this is the shoping bag we want to update in the db
                user.shopping_bag = user.shopping_bag.push(mealObjectId);
                User.findOneAndUpdate(query, {$set:user}, {new: true})
                .populate({path:'shopping_bag',select:'-updatedAt -createdAt', model: 'Meal' })
                .exec( function (err, user) {
                    if(err) {
                        callback(new Error("Couldn't update user shopping bag to the data base."));
                    } else {
                        callback(null,user);
                    }
                });
            }
        });
    }
}

function updatePassword(uniqueField, uniqueFieldValue, user, passwordToUpdate, callback){
    var query = {};
    var updatedPassword = {};
    query[`${uniqueField}`] = uniqueFieldValue;
    user.hashPassword(passwordToUpdate, function(err, hash){
        updatedPassword['password'] = hash;
        User.findOneAndUpdate(query, updatedPassword, {new:true}, function(err, user){
            if(err) {
                callback(err);
            }
            else{
                callback(null, user);
            }
        })
    })
}



//this method send mail to the admin - using gmail and smtp
async function contactUs(userEmail, userMessage, callback){
    const oauth2Client = new OAuth2(
        "418873488613-p3kggi0tha020oaa553dnh6795majbv2.apps.googleusercontent.com",//client id
        "XqCxM0WLxEWrtgwT4RCERr9l", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );
    
    oauth2Client.setCredentials({
        refresh_token: "1/V-9YETaDGad5Dkb1yL7K6jKxBZ4UMCPUhVduUr6A_Vn-oR2S7S28xPvUk5KBfDWW"
    });
    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    //setting up the transport setting
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: userEmail, 
             clientId: "418873488613-p3kggi0tha020oaa553dnh6795majbv2.apps.googleusercontent.com",
             clientSecret: "XqCxM0WLxEWrtgwT4RCERr9l",
             refreshToken: "1/V-9YETaDGad5Dkb1yL7K6jKxBZ4UMCPUhVduUr6A_Vn-oR2S7S28xPvUk5KBfDWW",
             accessToken: accessToken
        }
   });

    
    //Mail options
    const mailOptions = {
        from: userEmail,
        to: adminMail,
        subject: "moveo skill final project - contact us feature",
        text: userMessage
    }
    
    //send the mail 
    smtpTransport.sendMail(mailOptions, (err, response) => {
        if(err) {
            callback(err);
        } else {
            callback(null, response);
        }
        smtpTransport.close();
   });
 }

 function termsOfUse(callback){
    fs.readFile(termsOfUsePathFile, 'utf8', function(err, data){
        if(err) callback(err);
        else{
            callback(data);
        }
    })
 }

///--------------------helper methods--------------------///
//TODO check if to delete this method
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

//calculate the total price of the shopping bag
function sumShoppingBag(shoppingBag){
    //var shoppingBagJson = shoppingBag.shopping_bag;
    var sum = 0;
    for (var i = 0; i < shoppingBag.length; i++) {
        //TODO think if to change to sum only without calc
        sum += shoppingBag[i].quantity * shoppingBag[i].price;
    }
    return sum;
}

function orderToJson(order){
    var jsonOrder = {
        shopping_bag : order.shopping_bag,
        total_price : order.total_price,
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
    findByUniqueFieldAndUpdateUserData,
    findUserById,
    addMeal,
    updateShoppingBag,
    sumShoppingBag,
    addOrder,
    findByIdAndUpdateUser,
    deleteMealById,
    updatePassword,
    contactUs,
    termsOfUse
};