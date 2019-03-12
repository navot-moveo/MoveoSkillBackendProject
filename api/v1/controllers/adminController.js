/**
 * This module routes any URL that starts with: '../api/admin/'
 */

var adminHandler = require('../handlers/adminHandler.js');

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

module.exports = {
    addIcon,
    addObjectFilter,
    getObjectFilter
};
