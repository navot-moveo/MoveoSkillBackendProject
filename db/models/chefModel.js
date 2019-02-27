'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chef = new Schema({
    name: {
        type: String,
        required:'name is required'
    },
    personalStory: String,
    imageUrl: String
});

Chef.set('toJSON', {
    transform:function(doc, ret, options){
        return ret;
    }
});

module.exports = mongoose.model('Chef', Chef);