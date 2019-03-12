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
},
{
    versionKey: false,
    timestamps: true
});

Chef.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Chef', Chef);