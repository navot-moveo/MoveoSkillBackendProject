'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    meals:[{type: Schema.Types.ObjectId, ref: 'Meal'}]
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