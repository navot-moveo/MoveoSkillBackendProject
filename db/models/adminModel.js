'use strict';
var bcrypt = require('bcrypt');
const constantSalt = 10;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
    name: {
        type: String,
        required:'name is required',
        unique:true,
    },
    password:{
        type: String,
        required:'password is required'
    },
    token: String
});

Admin.pre('save', function(next){
    var admin = this;
    //checks if this is our first save or update,make sure that we hash the password only in the first time
    if(admin.isNew) {
        bcrypt.hash(admin.password, constantSalt, function(err, hash){
            if(err){
                return next(err);
            } 
            admin.password = hash;
            next();
        });
    } else {
        next();
    }
});

Admin.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        return ret;
    }
});


module.exports = mongoose.model('Admin', Admin);