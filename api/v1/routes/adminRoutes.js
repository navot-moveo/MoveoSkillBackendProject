
/**
 * This module routes any URL that starts with: '../api/admin'
 */
'use strict';
var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController.js');
var authValidator = require('../validators/authValidator.js');
var adminValidator = require('../validators/adminValidator.js'); 

//admins operations
router.route('/signup')
    .post(adminValidator.validateCreateAdmin,adminController.addAdmin, adminController.signAdmin);

//admin allready in the db
router.route('/login')
    .post(adminController.authenticate, adminController.signAdmin);


//protected routes - only admin operation
router.route('/orders')
    .get(authValidator.extractToken, authValidator.verifyAdminToken, adminController.getOrdersOfUserByUserId);

  
router.route('/')
    .post(authValidator.extractToken, authValidator.verifyAdminToken, adminController.addObjectFilter)
    .get(authValidator.extractToken, authValidator.verifyAdminToken, adminController.getObjectFilter);

    module.exports = router;