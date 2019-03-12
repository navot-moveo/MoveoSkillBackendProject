var mongoose = require('mongoose');
var Icon = require('../../../db/models/iconModel.js');
var DishCatagory = require('../../../db/models/dishCatagoryModel.js');
var User = require('../../../db/models/userModel.js');

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



module.exports = {
    addIcon,
    addObjectFilter,
    getObjectFilter
};