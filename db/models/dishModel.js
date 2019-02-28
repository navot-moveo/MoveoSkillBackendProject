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
    mealType: [{
        type: String
    }],
    price: Number,
    icons:[{type: Schema.Types.ObjectId, ref: 'Icon'}],
    imageUrl: String 
});

Dish.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Dish', Dish);