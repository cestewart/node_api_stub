'use strict';

const express = require('express');
const responseModel = require('../models/response');
const router = new express.Router();
const userService = require('../services/userService');
const config = require('../config');

module.exports = router;

router.post(config.routes.users + '/login' , login);

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
