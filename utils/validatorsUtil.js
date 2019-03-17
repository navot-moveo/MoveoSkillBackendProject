//custom check method
function checkField(field){
    var regex = '^[a-zA-Z ]*$';
    var found = field.match(regex);
    if(found === null || found[0] !== field){
        return false;
    } else{
        return true;
    }
}

function isPositive(number){
    if(number >= 0){
        return true;
    } else {
        return false;
    }
}

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
    checkField,
    isPositive,
    convertErrorsToArray
};