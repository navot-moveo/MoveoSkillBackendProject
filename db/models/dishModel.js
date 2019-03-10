'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Dish = new Schema({
    name: {
        type: String,
        required:'name is required',
        unique:true
    },
    ingredients: [{
        type: String
    }],
    catagory: {
        type: Schema.Types.ObjectId,
        ref: 'DishCatagory',
        required:'dish catagory is required'
    },
    sides:[{type: String}],
    changes:[{type: String}],
    price: Number,
    icons:[{type: Schema.Types.ObjectId, ref: 'Icon'}],
    imageUrl: String
    },
    {
        versionKey: false,
        timestamps: true
    }
);

Dish.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Dish', Dish);