/**
 * This module routes any URL that starts with: '../api/dishes'
 */

'use strict';
var express = require('express');
var router = express.Router();

var dishController = require('../controllers/dishController.js');
var dishValidator = require('../validators/dishValidator.js');

router.route('/')
    .post(dishValidator.validateCreateDish, dishController.addDish);

router.route('/:id')
    .get(dishController.getDishById);

module.exports = router;
