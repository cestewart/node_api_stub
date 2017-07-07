var should = require('should');
var sinon = require('sinon');
var responseModel = require('../../models/response');

beforeEach(function() {
    responseModel.reset();
});

describe('Login Controller Tests:', function(){
    describe('post', function(){
        it('should return a user', function() {
            var user = { userId: 101, username: 'jdoe' };
            var loginService = { login: function () {return user}};
            var loginController = require('../../controllers/loginController')(loginService, responseModel);
            var request = { body: { username:'bobsmith', password:'secret' } };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            loginController.post(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            response.send.args[0][0].data.userId.should.equal(101);
        });
        it('should NOT return a user', function() {
            var loginService = { login: function () {return null}};
            var loginController = require('../../controllers/loginController')(loginService, responseModel);
            var request = { body: { username:'bobsmithy', password:'secret' } };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            loginController.post(request, response);

            response.status.calledWith(403).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(false);
            response.send.args[0][0].messages[0].should.equal('Username or password is invalid.')
        });
    });
});



