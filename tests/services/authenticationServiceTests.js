var should = require('should');
var sinon = require('sinon');

describe('Authorization Service Tests:', function(){
    describe('createToken', function() {
        it('should return null when user is null', function(){
            var authenticationService = require('../../services/authenticationService')(require('jsonwebtoken'),(require('../../config')));

            should(authenticationService.createToken(undefined)).be.a.null();
            should(authenticationService.createToken(null)).be.a.null();
        });
        it('should return token', function(){
            var user = {
                id: '95da18d2-1968-476e-bab8-799598c9962e',
                username: 'melissajones'
            };

            var authenticationService = require('../../services/authenticationService')(require('jsonwebtoken'),(require('../../config')));

            var result = authenticationService.createToken(user);

            result.should.not.equal(null);
            result.should.be.a.String();
        });
    });
    describe('verifyToken', function() {
        it('should return 401 when token is missing', function() {
            var authenticationService = require('../../services/authenticationService')(require('jsonwebtoken'),(require('../../config')));

            var request = { headers: {} };
            var response = {
                status: sinon.spy(),
                end: sinon.spy()
            };
            var nextSpy = sinon.spy();

            authenticationService.verifyToken(request, response, nextSpy);

            response.status.calledWith(401).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.end.calledWith('Access token is missing').should.equal(true, 'Invalid message "' + response.end.args[0][0] + '"');
            should(nextSpy.called).be.False();
        });
        it('should return 401 when token is invalid', function() {
            var authenticationService = require('../../services/authenticationService')(require('jsonwebtoken'),(require('../../config')));

            var request = { headers: { authorization: 'badtoken' } };
            var response = {
                status: sinon.spy(),
                end: sinon.spy()
            };
            var nextSpy = sinon.spy();

            authenticationService.verifyToken(request, response, nextSpy);

            response.status.calledWith(401).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.end.calledWith('Access token is invalid').should.equal(true, 'Invalid message "' + response.end.args[0][0] + '"');
            should(nextSpy.called).be.False();
        });
        it('should call next when token is valid', function() {
            var authenticationService = require('../../services/authenticationService')(require('jsonwebtoken'), require('../../config'));

            var token = authenticationService.createToken({ username:'testuser', id:'b4349d14-1cd6-48f2-972e-aefd1ec88c78' });

            var request = { headers: { authorization: token } };
            var response = {
                status: sinon.spy(),
                end: sinon.spy()
            };
            var nextSpy = sinon.spy();

            authenticationService.verifyToken(request, response, nextSpy);

            should(nextSpy.called).be.True();
            should(response.status.called).be.False();
            should(response.end.called).be.False();
        });
    });
});