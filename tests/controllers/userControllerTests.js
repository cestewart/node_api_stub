var should = require('should');
var sinon = require('sinon');
var responseModel = require('../../models/response');

beforeEach(function() {
    responseModel.reset();
});

describe('User Controller Tests:', function(){
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
});



