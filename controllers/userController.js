'use strict';

var userController = function (userService, responseModel) {
    function get(request, response) {
        var user = userService.login(request);
        if (user === null) {
            responseModel.success = false;
            response.status(403).json(responseModel);
        } else {
            responseModel.data = user;
            response.status(200).json(responseModel);
        }
    }

    return {
        get: get
    }
}

module.exports = userController;