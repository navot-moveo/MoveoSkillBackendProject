const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = 'secret';
const secretAdminKey = 'secretadmin';

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

//this mathod verify users token
function verifyToken(req, res, next){
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            next();
        }
    })
}

//this mathod verify admins token
function verifyAdminToken(req, res, next){
    jwt.verify(req.token, secretAdminKey, (err, authData) => {
        if(err){
            next(err);
        } else{
            next();
        }
    })
}

module.exports = {
    extractToken,
    verifyToken,
    verifyAdminToken
}