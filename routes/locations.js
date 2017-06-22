'use strict';

const express = require('express');
const responseModel = require('../models/response');
const router = new express.Router();
const locationService = require('../services/locationService');
const baseRoute = "/locations/";

module.exports = router;

router.get(baseRoute, getAllLocations);

function getAllLocations(request, response) {
    responseModel.data = locationService.getAllLocations();
    response.status(200).json(responseModel);
}

router.get(baseRoute + ':id', getLocation);

function getLocation(request, response) {
    responseModel.data = locationService.getLocation(request.params.id);
    response.status(200).json(responseModel);
}
