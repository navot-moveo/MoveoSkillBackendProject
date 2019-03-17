'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
    name: {
        type: String,
        required:'name is required',
        unique:true
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'Chef',
        required:'chef is required'
    },
    cuisine: {
        type: String,
        required:'cuisine is required'
    },
    openingHours:{ 
        sunday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        monday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        tuesday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        wednesday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        thursday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        friday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        },
        saturday: {
            open: {
                type: Number,
                min:0,
                max:23.5
            },
            close: {
                type: Number,
                min:0,
                max:23.5
            }
        }
    },
    openingDate: {
        type : Date,
        required: 'opening date is required'
    },
    address: String,
    phone: String,
    about: String,
    rating: Number,
    imagesUrl:[{type: String}],
    dishes:[{type: Schema.Types.ObjectId, ref: 'Dish'}]
    },
    {
        timestamps: true,
        versionKey: false
    }
);



Restaurant.set('toJSON', {
    transform:function(doc, ret, options){
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = mongoose.model('Restaurant', Restaurant);

