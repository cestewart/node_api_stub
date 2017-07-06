'use strict';

const express = require('express');

var locationService = require('../services/locationService')(require('lodash'));
var locationController = require('../controllers/locationController')(locationService, require('../models/response'));

var routes = function() {
    var locationRouter = express.Router();

    locationRouter.get('/', locationController.getAllLocations);

    locationRouter.get('/:id', locationController.getLocation);

    return locationRouter;
}

module.exports = routes;
