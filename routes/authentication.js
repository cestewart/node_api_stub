'use strict';

const express = require('express');
const responseModel = require('../models/response');
const router = new express.Router();
const authenticationService = require('../services/authenticationService');
const baseRoute = "/authentication/";

module.exports = router;

router.post(baseRoute + 'encrypt', encrypt);

function encrypt(request, response) {
    responseModel.data = authenticationService.encrypt("secret");
    response.status(200).json(responseModel);
}