/**
 * This module routes any URL that starts with: '../api/'
 */

'use strict';
var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

router.route('/restaurants')
    .post(restaurantController.addRestaurant);


module.exports = router;