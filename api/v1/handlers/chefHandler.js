var mongoose = require('mongoose');
var Chef = require('../../../db/models/chefModel.js');

function addChef(chef, callback){
    var newChef = new Chef(chefToJson(chef));
    newChef.save(function(err, chef){
        if (err){
            callback(err);
        } else {
            callback(null, chef);
        }
    });
}

function getChefById(chefId, callback){
    var query = {};
    query['_id'] = chefId;
    Chef.findOne(query, function(err, chef){
        if(err){
            callback(err);
        } else{
            callback(null, chef);
        }
    });
}

function chefToJson(chef){
    var jsonChef = 
    {
        name: chef.name,
        personalStory: chef.personalStory,
        imageUrl: chef.imageUrl
    }
    return jsonChef;   
};

function getChefs(callback){
    Chef.find({},'name imageUrl')
    .exec(function(err, chefs){
        if(err){
            callback(err);
        } else{
            callback(null, chefs);
        }
    })  
}

module.exports = {
    addChef,
    getChefById,
    getChefs
};