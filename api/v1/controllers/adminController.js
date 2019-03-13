/**
 * This module routes any URL that starts with: '../api/admin/'
 */

var adminHandler = require('../handlers/adminHandler.js');
var userHandler = require('../handlers/userHandler.js');

function addIcon(req, res, next){
    adminHandler.addIcon(req.body.icon, function(err, icon){
        if(err){
            next(err);
        } else{
            res.send(icon);
        }
    });
}

function addObjectFilter(req, res, next){
    if(req.query.objectType !== undefined){
        adminHandler.addObjectFilter(req.query.objectType, req.body.object, function(err, object){
            if(err){
                next(err);
            } else{
                res.send(object);
            }
        });
    }else {
        next(new Error("object type is undefined"));
    }
}


function getObjectFilter(req, res, next){
    if(req.query.objectType !== undefined){
        adminHandler.getObjectFilter(req.query.objectType, function(err, object){
            if(err){
                next(err);
            } else{
                res.send(object);
            }
        });
    }else {
        next(new Error("object type is undefined"));
    }
}

function getOrdersOfUserByUserId(req, res, next){
    if(req.query.userId !== undefined){
        adminHandler.getOrdersOfUserByUserId(req.query.userId, function(err, orders){
            if(err){
                next(err);
            } else{
                res.send(orders);
            }
        });
    }else {
        next(new Error("user id is undefined"));
    }
}

module.exports = {
    addIcon,
    addObjectFilter,
    getObjectFilter,
    getOrdersOfUserByUserId
};
