'use strict';

const express = require('express');
const responseModel = require('../models/response');
const router = new express.Router();
const userService = require('../services/userService');
const baseRoute = "/users/";
const config = require('../config');

module.exports = router;

router.post(config.routes.users + '/login' , isPasswordValid);

function isPasswordValid(request, response) {
    console.log(userService.login(request.body.username,request.body.password));
    response.status(200).json(responseModel);
}