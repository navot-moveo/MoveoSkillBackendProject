var mongoose = require('mongoose');
var Dish = require('../../../db/models/dishModel.js');

function addDish(dish, callback){
    var newDish = new Dish(dishToJson(dish));
    newDish.save(function(err, dish){
        if (err){
            callback(err);
        } else {
            callback(null, dish);
        }
    });
}

function dishToJson(dish){
    var jsonDish = 
    {
        name: dish.name,
        ingredients: dish.ingredients,
        mealType: dish.mealType,
        price: dish.price,
        icons: dish.icons,
        imageUrl: dish.imageUrl
    }
    return jsonDish;   
};



module.exports = {
    addDish
};