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
    chef: {type: Schema.Types.ObjectId, ref: 'Chef'},
    couisine: String,
    openingHours:[{nameOfTheDay:String, open: Number, close : Number}],
    address: String,
    phone: String,
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

