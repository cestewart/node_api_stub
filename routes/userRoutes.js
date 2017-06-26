'use strict';

const express = require('express');

var routes = function(responseModel){
    var userRouter = express.Router();

    const userService = require('../services/userService');

    userRouter.post('/login' , login);

    function login(request, response) {
        var user = userService.login(request);
        if (user === null) {
            responseModel.success = false;
            response.status(403).json(responseModel);
        } else {
            responseModel.data = user;
            response.status(200).json(responseModel);
        }
    }

    return userRouter;
};

module.exports = routes;
