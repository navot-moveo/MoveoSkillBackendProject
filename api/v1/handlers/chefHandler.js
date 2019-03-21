var mongoose = require('mongoose');
var Chef = require('../../../db/models/chefModel.js');

function addChef(chef, callback){
    var newChef = new Chef(chefToJson(chef));
    newChef.save(callback);
}

function getChefById(chefId, callback){
    var query = {};
    query['_id'] = chefId;
    Chef.findOne(query, callback);
}

function getChefs(callback){
    Chef.find({},'name imageUrl')
    .exec(callback);  
}

//----------- helper methods ------------//
function chefToJson(chef){
    var jsonChef = 
    {
        name: chef.name,
        personalStory: chef.personalStory,
        imageUrl: chef.imageUrl
    }
    return jsonChef;   
};
module.exports = {
    addChef,
    getChefById,
    getChefs
};