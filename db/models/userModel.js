'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    full_name: {
        type: String,
        required:'name is required'
    },
    address:{
        type: String,
        required:'address is required'
    },
    phone_number:{
        type: String,
        required:'phone number is required'
    },
    password:{
        type: String,
        required:'password is required' 
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

User.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', User);