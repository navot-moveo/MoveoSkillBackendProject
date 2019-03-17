var mongoose = require('mongoose');
var Icon = require('../../../db/models/iconModel.js');
var DishCatagory = require('../../../db/models/dishCatagoryModel.js');
var User = require('../../../db/models/userModel.js');
var Order = require('../../../db/models/orderModel.js');

function addIcon(icon, callback){
    var newIcon = new Icon(iconToJson(icon));
    newIcon.save(function(err, icon){
        if (err){
            callback(err);
        } else {
            callback(null, icon);
        }
    });
}

function addDishCatagory(dishCatagory, callback){
    var newDishCatagory= new DishCatagory(dishCatagoryToJson(dishCatagory));
    newDishCatagory.save(function(err, dishCatagory){
        if (err){
            callback(err);
        } else {
            callback(null, dishCatagory);
        }
    });
}

function dishCatagoryToJson(dishCatagory){
    var jsonDishCatagory = 
    {
        name: dishCatagory.name,
        restaurant_id: dishCatagory.restaurantId
    }
    return jsonDishCatagory;  
}

function iconToJson(icon){
    var jsonIcon = 
    {
        name: icon.name,
        imageUrl: icon.imageUrl
    }
    return jsonIcon;   
};

function addObjectFilter(objectType, object, callback){
    switch(objectType){
        case 'icon':
        addIcon(object, callback);
        break;
        case 'dishCatagory':
        addDishCatagory(object, callback);
        break;
        default:
        break;
    }
}

function getObjectFilter(objectType, callback){
    switch(objectType){
        case 'icon':
        getIcons(callback);
        break;
        case 'user':
        getUsers(callback);
        break;
        case 'dishCatagory':
        //getDishCatagories(callback);
        break;
        case 'order':
        getOrdersByUserId(callback);
        break;
        default:
        break;
    }
}

function getIcons(callback){
    Icon.find({},function(err, icons){
        if(err){
            callback(err);
        } else{
            callback(null, icons);
        }
    });
}

function getUsers(callback){
    User.find({},function(err, users){
        if(err){
            callback(err);
        } else{
            callback(null, users);
        }
    });
}

function getOrdersOfUserByUserId(userId, callback){
    var query = {};
    query['user_id'] = userId;    
    Order.find(query, {_id:0,'shopping_bag.dish_id':0 ,'shopping_bag.createdAt':0 ,'shopping_bag.updatedAt':0, user_id:0},function(err, orders){
        if(err){
            callback(err);
        } else{
            callback(null, orders);
        }
    });        
}



module.exports = {
    addIcon,
    addObjectFilter,
    getObjectFilter,
    getOrdersOfUserByUserId
};