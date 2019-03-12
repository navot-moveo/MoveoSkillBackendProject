'use strict';

function validateCreateRestaurant(req,res,next){
    req.check('restaurant', "restaurant doesn't exists").exists(),
    req.check('restaurant.name', "name doesn't exists").exists(),
    req.check('restaurant.chef', "chef doesn't exists").exists(),
    req.check('restaurant.cuisine',"cuisine doesn't exists").exists(),
    req.check('restaurant.openingDate',"opening date doesn't exists").exists(),
    req.check('restaurant.openingDate',"opening date is after today").isBefore()
    req.check('restaurant.rating',"rating is invalid value").isInt()
    var errors = req.validationErrors();
    if(errors) {
        next(convertErrorsToArray(errors));
    }else{
        next();
    }
}
/*
function validateOpeningHours(openingHours){
    if(openingHours.sunday.open !== undefined && openingHours.sunday.close !== undefined){
        openingHours.sunday.open = convertHourToMillisecondFromMidnight(openingHours.sunday.open);
        openingHours.sunday.close = convertHourToMillisecondFromMidnight(openingHours.sunday.close);
    }
    if(openingHours.monday.open !== undefined && openingHours.monday.close !== undefined){
        openingHours.monday.open = convertHourToMillisecondFromMidnight(openingHours.monday.open);
        openingHours.monday.close = convertHourToMillisecondFromMidnight(openingHours.monday.close);
    }
    if(openingHours.tuesday.open !== undefined && openingHours.tuesday.close !== undefined){
        openingHours.tuesday.open = convertHourToMillisecondFromMidnight(openingHours.tuesday.open);
        openingHours.tuesday.close = convertHourToMillisecondFromMidnight(openingHours.tuesday.close);
    }
    if(openingHours.wednesday.open !== undefined && openingHours.wednesday.close !== undefined){
        openingHours.wednesday.open = convertHourToMillisecondFromMidnight(openingHours.wednesday.open);
        openingHours.wednesday.close = convertHourToMillisecondFromMidnight(openingHours.wednesday.close);
    }
    if(openingHours.thursday.open !== undefined && openingHours.thursday.close !== undefined){
        openingHours.thursday.open = convertHourToMillisecondFromMidnight(openingHours.thursday.open);
        openingHours.thursday.close = convertHourToMillisecondFromMidnight(openingHours.thursday.close);
    }
    if(openingHours.friday.open !== undefined && openingHours.friday.close !== undefined){
        openingHours.friday.open = convertHourToMillisecondFromMidnight(openingHours.friday.open);
        openingHours.friday.close = convertHourToMillisecondFromMidnight(openingHours.friday.close);
    }
    if(openingHours.saturday.open !== undefined && openingHours.saturday.close !== undefined){
        openingHours.saturday.open = convertHourToMillisecondFromMidnight(openingHours.saturday.open);
        openingHours.saturday.close = convertHourToMillisecondFromMidnight(openingHours.saturday.close);
    }
}

function convertHourToMillisecondFromMidnight(hour){
    var milliSecSinceMidNight = hour * 3600000;
    return milliSecSinceMidNight;
}
*/

function convertErrorsToArray(errors){
    var errArray = [];
    for (let index = 0; index < errors.length; index++) {
        const errMsg = errors[index].msg;
        errArray.push(errMsg);
    }
    console.log(errArray);
    return errArray;
}


module.exports = {
    validateCreateRestaurant
};