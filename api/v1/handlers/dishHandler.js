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
//this method gives information before ordering a specific dish 
function getDishById(dishId, callback){
    var query = {};
    query['_id'] = dishId;
    Dish.findOne(query, '-catagory')
    .populate({
        path: 'icons'
    })
    .exec(function(err, dish){
        if(err){
            callback(err);
        } else{
            callback(null, dish);
        }
    });
}

function dishToJson(dish){
    var jsonDish = 
    {
        name: dish.name,
        ingredients: dish.ingredients,
        catagory: createObjectId(dish.catagory),
        sides: dish.sides,
        changes: dish.changes,
        price: dish.price,
        icons: arrayToObjectIds(dish.icons),
        imageUrl: dish.imageUrl
    }
    return jsonDish;   
};

function arrayToObjectIds(array){
    if(array !== undefined){
        for (let index = 0; index < array.length; index++) {
            array[index] = new mongoose.Types.ObjectId(array[index]);     
        }
    }
    return array;
}

function createObjectId(id){
    if(id !== undefined){
        let objectId = new mongoose.Types.ObjectId(id)
        return objectId;
    } 
}



module.exports = {
    addDish,
    getDishById
};