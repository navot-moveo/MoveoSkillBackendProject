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

module.exports = {
    addIcon
};
