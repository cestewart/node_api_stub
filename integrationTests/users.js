var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');

describe('User Endpoint Tests', function(){
    it('GET should return a user', function(done){
        agent.get(config.routes.root + config.routes.users + '/95da18d2-1968-476e-bab8-799598c9962e')
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.data.username.should.be.exactly('melissajones')
                done();
            });
    })
})
