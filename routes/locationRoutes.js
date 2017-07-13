'use strict';

const express = require('express');

var locationService = require('../services/locationService')(require('lodash'));
var locationController = require('../controllers/locationController')(locationService, require('../models/response'));
var authenticationService = require('../services/authenticationService')(require('jsonwebtoken'),require('../config'));

var routes = function() {
    var locationRouter = express.Router();

    locationRouter.get('/', [authenticationService.verifyToken], locationController.getAllLocations);

    locationRouter.get('/:id', [authenticationService.verifyToken], locationController.getLocation);

    return locationRouter;
}

module.exports = routes;
