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
var restaurantValidator = require('../validators/restaurantValidator.js');

router.route('/restaurants')
    .post(restaurantValidator.validateCreateRestaurant,restaurantController.addRestaurant)
    .get(restaurantController.getRestaurantsSortedBy)
 

router.route('/chefs')
    .post(chefController.addChef);

router.route('/dishes')
    .post(dishController.addDish);

router.route('/admin')
    .post(adminController.addObjectFilter)


module.exports = router;