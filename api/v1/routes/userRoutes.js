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

//sign up a new user
router.route('/signup')
    .post(userValidator.validateCreateUser,userController.addUser, userController.signUser);

//user allready in the db
router.route('/login')
    .post(userController.authenticate, userController.signUser);

//------------------------------------- validating token -------------------------------------//
//------------------------------------- from here all the request are token valid  -------------------------------------//

router.use(authValidator.extractToken, authValidator.verifyToken);

//TODO: change here tha validation step
router.route('/')
    .put(userValidator.ValiditeDataToUpdate, userController.verifyAndUpdateUser)
    

router.route('/shoppingBag')
    .get(userController.getUserShoppingBag)
    .post(mealValidator.validateCreateMeal, userController.addMeal, userController.updateShoppingBag);



router.route('/password')
    .post(userController.authenticate, userController.updatePassword);

router.route('/contactUs')
    .post(userController.contactUs);
 
router.route('/termsOfUse')
    .get(userController.termsOfUse);

router.route('/order')
    .post(userController.getUserShoppingBag, userController.addOrder, userController.resetUserShoppingBag);

//user contact details
router.route('/:id')
    .get(userController.getUserDetailsById);

module.exports = router;