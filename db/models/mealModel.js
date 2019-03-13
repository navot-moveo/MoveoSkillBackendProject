'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meal = new Schema({
    user_id:{type: Schema.Types.ObjectId, ref: 'User'},
    name: {
        type: String,
        required: 'meal name is required'
    },
    quantity: {
        type:Number,
        required:'quantity is required'
    },
    changes:[{type:String}],
    sides:[{type:String}],
    price: {
        type: Number,
        required:'price is required'
    },
    total_price: Number,
    dish_id:{
        type: String,
        required: 'dish id is required'
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

Meal.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Meal', Meal);