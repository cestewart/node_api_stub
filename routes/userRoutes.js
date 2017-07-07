'use strict';

var express = require('express');

var authenticationService = require('../services/authenticationService')(require('jsonwebtoken'),require('../config'));
var userService = require('../services/userService')(require('lodash'));
var userController = require('../controllers/userController')(userService, require('../models/response'));

var routes = function(){
    var userRouter = express.Router();

    userRouter.get('/:id', userController.getById);

    return userRouter;
};

module.exports = routes;
