'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Icon = new Schema({
    name: {
        type: String,
        enum:['spicy','vegitarian','vegan'],
        required:'name is required'
    },
    imageUrl: String
    },
    {
        versionKey: false,
        timestamps: true
    }
);

Icon.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Icon', Icon);