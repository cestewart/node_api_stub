var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');

describe('User Endpoint Tests', function(){
    it('POST should return a user', function(done){
        var userCredentials = {
            "username":"bobsmith",
            "password":"secret"
        };

        agent.post(config.routes.root + config.routes.users)
            .send(userCredentials)
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.data.username.should.be.exactly(userCredentials.username)
                done();
            });
    })
})
