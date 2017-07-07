'use strict';

var loginController = function (loginService, responseModel) {
    function post(request, response) {
        var user = loginService.login(request.body.username, request.body.password);
        if (user === null) {
            responseModel.success = false;
            responseModel.messages = ['Username or password is invalid.'];
            response.status(403);
            response.send(responseModel);
        } else {
            responseModel.data = user;
            response.status(200);
            response.send(responseModel);
        }
    }

    return {
        post: post
    }
}

module.exports = loginController;