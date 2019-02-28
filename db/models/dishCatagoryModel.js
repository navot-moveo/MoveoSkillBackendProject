'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishCatagory = new Schema([{
    type:String,
    unique:true
}]);

Icon.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('DishCatagory', DishCatagory);