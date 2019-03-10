'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishCatagory = new Schema({
    name: String,
    restaurant_id: {type: Schema.Types.ObjectId, ref: 'Restaurant'}
});

DishCatagory.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('DishCatagory', DishCatagory);