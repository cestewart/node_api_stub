'use strict';

const express = require('express');

var routes = function(responseModel) {
    var locationRouter = express.Router();

    const locationService = require('../services/locationService');

    locationRouter.get('/', getAllLocations);

    function getAllLocations(request, response) {
        responseModel.data = locationService.getAllLocations();
        response.status(200).json(responseModel);
    }

    locationRouter.get('/:id', getLocation);

    function getLocation(request, response) {
        responseModel.data = locationService.getLocation(request.params.id);
        response.status(200).json(responseModel);
    }

    return locationRouter;
}

module.exports = routes;


