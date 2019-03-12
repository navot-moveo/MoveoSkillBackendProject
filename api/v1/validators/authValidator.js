const express = require('express');

//this method extract the token from the headers and put it in the request
//token Format : bearer <access_token>
function extractToken(req, res, next){
    const bearerTokenFormat = req.headers['authorization'];
    //check if the token is undefined
    if(typeof(bearerTokenFormat) !== 'undefined'){
        //split at the space in the format to an array
        const bearer = bearerTokenFormat.split(' ');
        //extract the token from the array
        const token = bearer[1];
        //set the token
        req.token = token;
        //continue to the next middlware
        next();
    } else {
        next(new Error("verify token faild. invalid token"));
    }
}

module.exports = {
    extractToken
}