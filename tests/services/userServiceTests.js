var should = require('should');
var sinon = require('sinon');
var bcryptStub = { };
var authenticationServiceStub = {};

describe('User Service Tests:', function() {
    describe('getUserByUsername', function(){
        it('should return a user', function() {
            var userService = require('../../services/userService')(bcryptStub, authenticationServiceStub);

            var results = userService.getUserByUsername('bobsmith');

            results.id.should.be.exactly('7cafedfb-616c-4093-bec6-b167bcd18ca8');
        }),
        it('should NOT return a user', function() {
            var userService = require('../../services/userService')(bcryptStub, authenticationServiceStub);

            var results = userService.getUserByUsername('bobsmithy');

            should(results).be.a.undefined();
        })
    }),
    describe('login', function() {
        it('should return a user', function () {
            var request = {
                body: {
                    username: 'georgejones',
                    password: 'secret'
                }
            }

            var bcrypt = require('bcrypt');

            var authenticationService = {
                createToken: sinon.spy()
            }

            var userService = require('../../services/userService')(bcrypt, authenticationService);

            var results = userService.login(request);

            results.username.should.be.a.String();

            authenticationService.createToken.calledOnce.should.equal(true);
        }),
        it('should NOT return a user when username is not found', function () {
            var request = {
                body: {
                    username: 'georgejjjjones',
                    password: 'secret'
                }
            }

            var authenticationService = {
                createToken: sinon.spy()
            }

            var userService = require('../../services/userService')(bcryptStub, authenticationService);

            var results = userService.login(request);

            should(results).be.a.null();
            authenticationService.createToken.called.should.equal(false);
        }),
        it('should NOT return a user when password is invalid', function () {
            var request = {
                body: {
                    username: 'georgejones',
                    password: 'secretsss'
                }
            }

            var bcrypt = require('bcrypt');

            var authenticationService = {
                createToken: sinon.spy()
            }

            var userService = require('../../services/userService')(bcrypt, authenticationService);

            var results = userService.login(request);

            should(results).be.a.null();
            authenticationService.createToken.called.should.equal(false);
        })
    })
})

