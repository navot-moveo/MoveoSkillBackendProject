/**
 * This module routes any URL that starts with: '../api/restaurants'
 */
'use strict';
var express = require('express');
var router = express.Router();

var restaurantController = require('../controllers/restaurantController.js');
var restaurantValidator = require('../validators/restaurantValidator.js');


router.route('/')
    .post(restaurantValidator.validateCreateRestaurant,restaurantController.addRestaurant)
    .get(restaurantController.getRestaurantsSortedBy);

router.route('/home')
    .get(restaurantController.getAllRestaurantsCuisine);

router.route('/search')
    .get(restaurantController.searchRestaurant);

router.route('/:id')
    .get(restaurantController.getRestaurantActionById)
    .put(restaurantController.getRestaurantActionById);

module.exports = router;