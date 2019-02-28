var mongoose = require('mongoose');
var Icon = require('../../../db/models/iconModel.js');

function addIcon(icon, callback){
    var newIcon = new Icon(iconToJson(icon));
    newIcon.save(function(err, icon){
        if (err){
            callback(err);
        } else {
            callback(null, icon);
        }
    });
}

function iconToJson(icon){
    var jsonIcon = 
    {
        name: icon.name,
        imageUrl: icon.imageUrl
    }
    return jsonIcon;   
};





module.exports = {
    addIcon
};