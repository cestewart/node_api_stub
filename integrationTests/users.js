var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');
var authenticationService = require('../services/authenticationService')(require('jsonwebtoken'), config);
var token = authenticationService.createToken({ id: '7cafedfb-616c-4093-bec6-b167bcd18ca8', username: 'bobsmith' });

describe('User Endpoint Tests', function(){
    it('GET should return a user', function(done){
        agent.get(config.routes.root + config.routes.users + '/95da18d2-1968-476e-bab8-799598c9962e')
            .set({authorization:token})
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                console.log(results.body);
                results.body.data.username.should.be.exactly('melissajones');
                results.body.success.should.be.True();
                done();
            });
    });
    it('GET should return all users', function(done){
        agent.get(config.routes.root + config.routes.users)
            .set({authorization:token})
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.data.length.should.be.exactly(4);
                results.body.success.should.be.True();
                done();
            });
    });
    it('POST should add a user', function(done){
        var body = {
            "id": "f1b63216-84c4-4e59-9d33-c39488f81998",
            "firstName": "Chris",
            "lastName": "Stewart",
            "username": "cstewart",
            "password": "secret"
        };

        agent.post(config.routes.root + config.routes.users)
            .send(body)
            .set({authorization:token})
            .type('json')
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.success.should.be.True();
                done();
            });
    });
});
