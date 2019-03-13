const bcrypt = require('bcrypt');

//this method compare the un hash password with the hash password
function comparePasswords(plainPassword, encryptPassword, cb){
    bcrypt.compare(plainPassword, encryptPassword, (err,result) => {
      if(err) next(err);
      if(result){
          //user exist -> continue to signin
          cb(null);
      } else{
          //password isn't correct
          cb(new Error("Incorrect password. please enter password again."));    
      }
    })
}

module.exports = {
    comparePasswords
}