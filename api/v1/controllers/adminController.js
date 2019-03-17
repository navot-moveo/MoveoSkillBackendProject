/**
 * This module routes any URL that starts with: '../api/admin/'
 */
var adminHandler = require('../handlers/adminHandler.js');
var userHandler = require('../handlers/userHandler.js');
const uniquField = 'name';
const jwt = require('jsonwebtoken');
const secretAdminKey = 'secretadmin';
const authUtil = require('../../../utils/authUtil.js');

//this method add admin to the db
function addAdmin(req, res, next){
    if(req.body.admin !== undefined){
        adminHandler.addAdmin(req.body.admin, function(err, admin){
            if(err){
                next(err);
            } else{
                res.locals["adminData"] = admin;
                next();
            }
        });
    } else {
        next(new Error("admin field is undefined"));
    }
}

function signAdmin(req,res,next){
    //first param is the payload, second param is the privatekey
    //async - this token will be valid for 8h
    jwt.sign({admin:res.locals["adminData"]}, secretAdminKey, {expiresIn: '8h' }, (err, token) => {
        if(err) throw err;
        var adminToSend = res.locals["adminData"]
        adminToSend.token = token
        res.send(adminToSend);
    });
}

function authenticate(req, res, next) {
    const uniquFieldValue = req.body[`${uniquField}`];
    adminHandler.findAdminByUniqueField(uniquField, uniquFieldValue, (err, admin) => {
        if (err) {
            //admin doesn't exist -> can't login
            next(err);
        } else {
            //admin exist-> compare plain password and hashed password       
            authUtil.comparePasswords(req.body.password, admin.password, (err) => {
                if(err){
                    //password isn't correct
                    next(err);
                } else{
                    res.locals["adminData"] = admin;
                    next();
                }
            })
        }
    });
}

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
    getOrdersOfUserByUserId,
    addAdmin,
    authenticate,
    signAdmin
};
