/**
 * This module routes any URL that starts with: '../api/'
 */

'use strict';
var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');
var chefController = require('../controllers/chefController.js');
var adminController = require('../controllers/adminController.js');
var dishController = require('../controllers/dishController.js');
var userController = require('../controllers/userController.js');
var restaurantValidator = require('../validators/restaurantValidator.js');
var authValidator = require('../validators/authValidator.js');

router.route('/restaurants')
    .post(restaurantValidator.validateCreateRestaurant,restaurantController.addRestaurant)
    .get(restaurantController.getRestaurantsSortedBy);

router.route('/restaurants/allCuisines')
    .get(restaurantController.getAllRestaurantsCuisine);

router.route('/restaurants/search')
    .get(restaurantController.searchRestaurant);

router.route('/restaurants/:id')
    .get(restaurantController.getRestaurantActionById);

router.route('/chefs')
    .post(chefController.addChef);

router.route('/chefs/:id')
    .get(chefController.getChefById);

router.route('/dishes')
    .post(dishController.addDish);

router.route('/dishes/:id')
    .get(dishController.getDishById);

//this route is user actions - so all the actions are protected
router.route('/users')
    .put(authValidator.extractToken, userController.verifyAndUpdateUser)
    

//this route is user actions - so all the actions are protected
router.route('/users/shoppingBag')
    .get(authValidator.extractToken, userController.verifyToken,userController.getUserShoppingBag)
    .post(authValidator.extractToken, userController.verifyToken, userController.addMeal,
        userController.updateShoppingBag);

//this route is user actions - so all the actions are protected
router.route('/users/order')
    .post(authValidator.extractToken, userController.verifyToken,userController.addOrder,
        userController.resetUserShoppingBag);

//sign up a new user
router.route('/users/signup')
    .post(userController.addUser, userController.signUser);

//user allready in the db
router.route('/users/login')
    .post(userController.authenticate, userController.signUser);

//user contact details
router.route('/users/:id')
    .get(userController.getUserDetailsById);

router.route('/admin')
    .post(adminController.addObjectFilter)
    .get(adminController.getObjectFilter);


module.exports = router;