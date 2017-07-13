'use strict';

var express = require('express');

var authenticationService = require('../services/authenticationService')(require('jsonwebtoken'),require('../config'));
var userService = require('../services/userService')(require('lodash'));
var userController = require('../controllers/userController')(userService, require('../models/response'), require('bcrypt'), require('../config'));

var routes = function(){
    var userRouter = express.Router();

    userRouter.get('/:id', [authenticationService.verifyToken], userController.getById);
    userRouter.get('/', [authenticationService.verifyToken], userController.getAll);
    userRouter.post('/', [authenticationService.verifyToken], userController.addUser);
    userRouter.put('/', [authenticationService.verifyToken], userController.updateUser);
    userRouter.delete('/', [authenticationService.verifyToken], userController.deleteUser);

    return userRouter;
};

module.exports = routes;
