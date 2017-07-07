'use strict';

var userController = function (userService, responseModel) {
    function getById(request, response) {
        responseModel.data = userService.getById(request.params.id);
        response.status(200);
        response.send(responseModel);
    }

    return {
        getById: getById
    }
}

module.exports = userController;