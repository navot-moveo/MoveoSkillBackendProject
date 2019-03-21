/**
 * This module routes any URL that starts with: '../api/chefs'
 */
'use strict';
var express = require('express');
var router = express.Router();

var chefController = require('../controllers/chefController.js');
var chefValidator = require('../validators/chefValidator.js');


router.route('/')
.post(chefValidator.validateCreateChef, chefController.addChef)
.get(chefController.getChefs);

router.route('/:id')
.get(chefController.getChefById);

module.exports = router;