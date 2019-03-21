/**
 * This module routes any URL that starts with: '../api/'
 */
'use strict';
var express = require('express');
var router = express.Router();

var usersRoutes = require('./userRoutes');
var restaurantsRoutes = require('./restaurantsRoutes');
var adminRoutes = require('./adminRoutes');
var chefsRoutes = require('./chefsRoutes');
var dishesRoutes = require('./dishesRoutes');


router.use('/users',usersRoutes);
router.use('/restaurants',restaurantsRoutes);
router.use('/admin',adminRoutes);
router.use('/chefs',chefsRoutes);
router.use('/dishes',dishesRoutes);


module.exports = router;