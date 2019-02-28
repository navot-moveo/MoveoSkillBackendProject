'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
    name: {
        type: String,
        required:'name is required',
        unique:true
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'Chef',
        required:'chef is required'
    },
    cuisine: {
        type: String,
        required:'cuisine is required'
    },
    openingHours:[{nameOfTheDay:String, open: Number, close : Number}],
    openingDate: {
        type : Date,
        required: 'opening date is required'
    },
    address: String,
    phone: String,
    about: String,
    imagesUrl:[{type: String}],
    dishes:[{type: Schema.Types.ObjectId, ref: 'Dish'}]
    },
    {
        timestamps: true
    }
);

Restaurant.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Restaurant', Restaurant);

