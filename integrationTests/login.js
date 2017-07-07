var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');

describe('Login Endpoint Tests', function(){
    it('POST should return a user', function(done){
        var userCredentials = {
            "username":"bobsmith",
            "password":"secret"
        };

        agent.post(config.routes.root + config.routes.login)
            .send(userCredentials)
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.data.username.should.be.exactly(userCredentials.username)
                done();
            });
    }),
        it('POST should NOT return a user', function(done){
            var userCredentials = {
                "username":"bobsmith",
                "password":"secretsss"
            };

            agent.post(config.routes.root + config.routes.login)
                .send(userCredentials)
                .expect(403)
                .end(function(error, results) {
                    if (error) return done(error);
                    results.body.data.username.should.be.exactly(userCredentials.username)
                    done();
                });
        })
})
