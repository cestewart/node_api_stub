var should = require('should');
var sinon = require('sinon');
var testToken = 'tokentokentoken';
var stubBcrypt = {};
var stubAuthenticationService = {};

describe('Login Service Tests:', function() {
    describe('post', function () {
        it('should return a user', function () {
            var userService = {
                getByUsername: function () {
                    return { password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG' };
                }
            };
            var authenticationService = {
                createToken: function () {
                    return testToken;
                }
            };

            var loginService = require('../../services/loginService')(require('bcrypt'), userService, authenticationService);
            var results = loginService.login('georgejones', 'secret');

            results.token.should.be.exactly(testToken);
        });
        it('should NOT return a user when username is not found', function () {
            var userService = {
                getByUsername: function () {
                    return undefined;
                }
            };

            var loginService = require('../../services/loginService')(stubBcrypt, userService, stubAuthenticationService);
            var results = loginService.login('invalid_user', 'secret');

            should(results).be.a.null();
        });
        it('should NOT return a user when password is invalid', function () {
            var userService = {
                getByUsername: function () {
                    return { password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG' };
                }
            };

            var loginService = require('../../services/loginService')(require('bcrypt'), userService, stubAuthenticationService);
            var results = loginService.login('georgejones', 'secretsss');

            should(results).be.a.null();
        });
    });
});

