/**
 * This module routes any URL that starts with: '../api/users'
 */

'use strict';
var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var authValidator = require('../validators/authValidator.js');
var userValidator = require('../validators/userValidator.js');
var mealValidator = require('../validators/mealValidator.js');


//user allready in the db
router.route('/login')
    .post(userController.authenticate, userController.signUser);

//------------------------------------- validating token -------------------------------------//
//------------------------------------- from here all the request are token valid  -------------------------------------//

router.use(authValidator.extractToken, authValidator.verifyToken);

//this route is user actions - so all the actions are protected
router.route('/')
    .put(authValidator.extractToken, userValidator.ValiditeDataToUpdate, userController.verifyAndUpdateUser)
    

//this route is user actions - so all the actions are protected
//authValidator.extractToken, authValidator.verifyToken
router.route('/shoppingBag')
    .get(userController.getUserShoppingBag)
    .post(mealValidator.validateCreateMeal, userController.addMeal, userController.updateShoppingBag);
    

//this route is user actions - so all the actions are protected
router.route('/shoppingBag')
    .get(authValidator.extractToken, authValidator.verifyToken,userController.getUserShoppingBag)
    .post(mealValidator.validateCreateMeal,authValidator.extractToken, authValidator.verifyToken, userController.addMeal,
        userController.updateShoppingBag);

//this route is user actions - so all the actions are protected
router.route('/order')
    .post(authValidator.extractToken, authValidator.verifyToken,userController.addOrder,
        userController.resetUserShoppingBag);

//this route is user actions - so all the actions are protected
router.route('/password')
    .post(authValidator.extractToken, authValidator.verifyToken, userController.authenticate,
         userController.updatePassword);

//sign up a new user
router.route('/signup')
    .post(userValidator.validateCreateUser,userController.addUser, userController.signUser);



router.route('/contactUs')
    .post(authValidator.extractToken, authValidator.verifyToken, userController.contactUs);
 
router.route('/termsOfUse')
    .get(authValidator.extractToken, authValidator.verifyToken, userController.termsOfUse);

//user contact details
router.route('/:id')
    .get(authValidator.extractToken, authValidator.verifyToken, userController.getUserDetailsById);

module.exports = router;