'use strict';

var express = require('express');

var authenticationService = require('../services/authenticationService')(require('jsonwebtoken'),require('../config'));
var userService = require('../services/userService')(require('lodash'));
var loginService = require('../services/loginService')(require('bcrypt'), userService, authenticationService);
var loginController = require('../controllers/loginController')(loginService, require('../models/response'));

var routes = function(){
    var userRouter = express.Router();

    userRouter.post('/' , loginController.post);

    return userRouter;
};

module.exports = routes;
