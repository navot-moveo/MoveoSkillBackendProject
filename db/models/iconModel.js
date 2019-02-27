'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Icon = new Schema({
    name: {
        type: String,
        enum:['spicy','vegitarian','vegan'],
        required:'name is required'
    },
    image: String
});

Icon.set('toJSON', {
    transform:function(doc, ret, options){
        return ret;
    }
});

module.exports = mongoose.model('Icon', Icon);