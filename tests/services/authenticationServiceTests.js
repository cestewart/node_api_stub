var should = require('should');
var sinon = require('sinon');
var jwt = require('jsonwebtoken');
var config = require('../../config');

describe('Authorization Service Tests:', function(){
    describe('createToken', function() {
        it('should return null when user is null', function(){
            var authenticationService = require('../../services/authenticationService')(jwt, config);

            should(authenticationService.createToken(undefined)).be.a.null();
            should(authenticationService.createToken(null)).be.a.null();
        }),
        it('should return token', function(){
            var user = {
                username: sinon.spy(),
                id: sinon.spy()
            }
            var authenticationService = require('../../services/authenticationService')(jwt, config);

            var result = authenticationService.createToken(user);

            result.should.not.equal(null)
            result.should.be.a.String();
        })
    })
})