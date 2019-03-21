
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




router.use(authValidator.extractToken, authValidator.verifyAdminToken);
//------------------------------------- validating token -------------------------------------//
//------------------------------------- from here all the request are token valid  -------------------------------------//

router.route('/')
    .post(adminController.addObjectFilter)
    .get(adminController.getObjectFilter);

router.route('/orders')
    .get(adminController.getOrdersOfUserByUserId);

  
module.exports = router;