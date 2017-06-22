'use strict';

const express = require('express');
const responseModel = require('../models/response');
const router = new express.Router();
const userService = require('../services/userService');
const baseRoute = "/users/";

module.exports = router;

router.post(baseRoute + 'login/:username' , isPasswordValid);

function isPasswordValid(request, response) {
    responseModel.data = userService.isPasswordValid(request.params.username,"secret");
    response.status(200).json(responseModel);
}