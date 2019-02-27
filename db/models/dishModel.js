'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dish = new Schema({
    name: {
        type: String,
        required:'name is required'
    },
    ingredients: [{
        type: String
    }],
    mealType: {
        type: String,
        enum: ['breakfast','lunch','dinner']
    },
    price: Number,
    icons:[{type: Schema.Types.ObjectId, ref: 'Icon'}],
    image: String 
});

Dish.set('toJSON', {
    transform:function(doc, ret, options){
        return ret;
    }
});

module.exports = mongoose.model('Dish', Dish);