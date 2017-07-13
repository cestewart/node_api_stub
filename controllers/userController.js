'use strict';

var userController = function (userService, responseModel, bcrypt, config) {
    function getById(request, response) {
        responseModel.data = userService.getById(request.params.id);
        response.status(200);
        response.send(responseModel);
    }

    function getAll(request, response) {
        responseModel.data = userService.getAll();
        response.status(200);
        response.send(responseModel);
    }

    function addUser(request, response) {
        var user = {
            id: request.body.id,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            username: request.body.username,
            password: hashPassword(request.body.password)
        };
        responseModel.data = userService.addUser(user);
        response.status(200);
        response.send(responseModel);
    }

    function updateUser(request, response) {
        var user = {
            id: request.body.id,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            username: request.body.username,
            password: hashPassword(request.body.password)
        };
        responseModel.data = userService.updateUser(user);
        response.status(200);
        response.send(responseModel);
    }

    function deleteUser(request, response) {
        var user = {
            id: request.body.id
        };
        responseModel.data = userService.deleteUser(user);
        response.status(200);
        response.send(responseModel);
    }

    function hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(config.bcrypt.saltRounds));
    }

    return {
        getById: getById,
        getAll: getAll,
        addUser: addUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
};

module.exports = userController;