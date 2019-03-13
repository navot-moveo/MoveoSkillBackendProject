'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const constantSalt = 10;
const validator = require('validator')
var Schema = mongoose.Schema;

var User = new Schema({
    full_name: {
        type: String,
        required:'name is required'
    },
    email:{
        type: String,
        validate: [ validator.isEmail, 'invalid email' ],
        unique:true,
        required:'email is required'
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
    },
    token:{
        type:String
    }, 
    shopping_bag: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
},
    {
        versionKey: false,
        timestamps: true
    }
);

User.pre('save', function(next){
    var user = this;
    //checks if this is our first save or update,make sure that we hash the password only in the first time
    if(user.isNew) {
        bcrypt.hash(user.password, constantSalt, function(err, hash){
            if(err){
                return next(err);
            } 
            user.password = hash;
            next();
        });
    } else {
        next();
    }
});

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