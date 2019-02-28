'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chef = new Schema({
    name: {
        type: String,
        required:'name is required',
        unique:true
    },
    personalStory: String,
    imageUrl: String
});

Chef.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Chef', Chef);