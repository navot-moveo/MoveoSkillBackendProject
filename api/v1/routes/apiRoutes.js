/**
 * This module routes any URL that starts with: '../api/'
 */

'use strict';
var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');
var chefController = require('../controllers/chefController.js');
var dishController = require('../controllers/dishController.js');

router.route('/restaurants')
    .post(restaurantController.addRestaurant)
    .get(restaurantController.getRestaurants)

router.route('/chefs')
    .post(chefController.addChef);

router.route('/dishes')
    .post(dishController.addDish);


module.exports = router;