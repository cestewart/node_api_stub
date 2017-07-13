var should = require('should');
var sinon = require('sinon');
var responseModel = require('../../models/response');
var stubBcrypt = {};
var stubConfig = {};

beforeEach(function() {
    responseModel.reset();
});

describe('User Controller Tests:', function(){
    describe('getAll', function() {
        it('should return a list of users', function() {
            var userService = require('../../services/userService')(require('lodash'));
            sinon.spy(userService, "getAll");
            var userController = require('../../controllers/userController')(userService, responseModel, stubBcrypt, stubConfig);
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.getAll(response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            userService.getAll.calledWith().should.equal(true);
            response.send.args[0][0].data.length.should.equal(4);
        });
    });
    describe('getById', function(){
        it('should return a user', function() {
            var user = { userId: 101, username: 'jdoe' };
            var userService = { getById: function () {return user}};
            var userController = require('../../controllers/userController')(userService, responseModel);
            var request = { params: { id:'df9980bc-6b79-4fe3-8bbc-5a81c7b88e0b' } };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.getById(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            response.send.args[0][0].data.userId.should.equal(101);
        });
        it('should NOT return a user', function() {
            var userService = { getById: function () {return null}};
            var userController = require('../../controllers/userController')(userService, responseModel);
            var request = { params: { id:'missing id' } };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.getById(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
        });
    });
    describe('addUser', function() {
        it('should add a user', function() {
            var bcrypt = require('Bcrypt');
            var userService = require('../../services/userService')(require('lodash'));
            sinon.spy(userService, "addUser");
            var userController = require('../../controllers/userController')(userService, responseModel, bcrypt, require('../../config'));
            var request = {
                body: {
                    id: '5eda953a-8913-4bbf-944f-78022f8b3a06',
                    firstName: 'Test',
                    lastName: 'Tester',
                    username: 'ttester',
                    password: 'secret'
                }
            };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.addUser(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            userService.addUser.called.should.equal(true);

            var addedUser = userService.getById(request.body.id);
            addedUser.should.not.be.Null();
            addedUser.id.should.equal(request.body.id);
            addedUser.firstName.should.equal(request.body.firstName);
            addedUser.lastName.should.equal(request.body.lastName);
            addedUser.username.should.equal(request.body.username);
            bcrypt.compareSync(request.body.password, addedUser.password).should.be.True();
        });
    });
    describe('updateUser', function() {
        it('should update a user', function() {
            var bcrypt = require('Bcrypt');
            var userService = require('../../services/userService')(require('lodash'));
            sinon.spy(userService, "updateUser");
            var userController = require('../../controllers/userController')(userService, responseModel, bcrypt, require('../../config'));
            var request = {
                body: {
                    id: 'd20ed1a1-4650-4d8f-9df7-5faa91363341',
                    firstName: 'Jane',
                    lastName: 'Jones',
                    username: 'janejones',
                    password: 'secret'
                }
            };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.updateUser(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            userService.updateUser.calledWith().should.equal(true);

            var user = userService.getById(request.body.id);
            user.should.not.be.Null();
            user.id.should.equal(request.body.id);
            user.firstName.should.equal(request.body.firstName);
            user.lastName.should.equal(request.body.lastName);
            user.username.should.equal(request.body.username);
            bcrypt.compareSync(request.body.password, user.password).should.be.True();
        });
    });
    describe('deleteUser', function() {
        it('should delete a user', function() {
            var userService = require('../../services/userService')(require('lodash'));
            sinon.spy(userService, "deleteUser");
            var userController = require('../../controllers/userController')(userService, responseModel, stubBcrypt, stubConfig);
            var request = {
                body: {
                    id: 'd20ed1a1-4650-4d8f-9df7-5faa91363341'
                }
            };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            userController.deleteUser(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            userService.deleteUser.calledWith().should.equal(true);
            should(userService.getAll().length).be.exactly(3);
        });
    });
});



