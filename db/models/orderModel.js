'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
         ref: 'User',
        required:'user id is required'
    },
    shopping_bag:{
        type: Object,
        required:'shopping bag is required'
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

Order.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Order', Order);