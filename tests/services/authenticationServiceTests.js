var should = require('should');
var sinon = require('sinon');
var jwtStub = {};
var configStub = {};

describe('Authorization Service Tests:', function(){
    describe('createToken', function() {
        it('should return null when user is null', function(){
            var authenticationService = require('../../services/authenticationService')(jwtStub, configStub);

            should(authenticationService.createToken(undefined)).be.a.null();
            should(authenticationService.createToken(null)).be.a.null();
        });
        it('should return token', function(){
            var user = {
                id: '95da18d2-1968-476e-bab8-799598c9962e',
                username: 'melissajones'
            };

            var jwt = require('jsonwebtoken');
            var config = require('../../config');

            var authenticationService = require('../../services/authenticationService')(jwt, config);

            var result = authenticationService.createToken(user);

            result.should.not.equal(null);
            result.should.be.a.String();
        });
    });
    describe('verifyToken', function() {
        it('should return decoded token', function() {
            var user = {
                id: '95da18d2-1968-476e-bab8-799598c9962e',
                username: 'melissajones'
            };

            var jwt = require('jsonwebtoken');
            var config = require('../../config');

            var authenticationService = require('../../services/authenticationService')(jwt, config);

            var signedToken = authenticationService.createToken(user);

            var result = authenticationService.verifyToken(signedToken);

            result.iss.should.be.a.String();
            result.username.should.be.a.String();
        });
        it('should return null', function() {
            var user = {
                id: '95da18d2-1968-476e-bab8-799598c9962e',
                username: 'melissajones'
            };

            var jwt = require('jsonwebtoken');
            var config = require('../../config');

            var authenticationService = require('../../services/authenticationService')(jwt, config);

            var signedToken = authenticationService.createToken(user);

            var result = authenticationService.verifyToken(signedToken + '_broken');

            should(result).be.a.null();
        });
    });
});