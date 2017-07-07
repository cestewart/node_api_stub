'use strict';

var locationController = function (locationService, responseModel) {
    function getAllLocations(request, response) {
        responseModel.data = locationService.getAllLocations();
        response.status(200);
        response.send(responseModel);
    }

    function getLocation(request, response) {
        responseModel.data = locationService.getLocation(request.params.id);
        response.status(200);
        response.send(responseModel);
    }

    return {
        getAllLocations: getAllLocations,
        getLocation: getLocation
    }
}

module.exports = locationController;