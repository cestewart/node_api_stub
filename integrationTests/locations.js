var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');

describe('Location Endpoint Tests', function(){
    it('GET should return all locations', function(done){
        agent.get(config.routes.root + config.routes.locations)
            .expect(200)
            .end(function(error, results) {
                if (error) return done(error);
                results.body.data.length.should.be.exactly(2);
                done();
            });
    })

    it('GET should return a location', function(done){
        agent.get(config.routes.root + config.routes.locations + '/dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f')
            .expect(200)
            .end(function(error, results){
                if (error) return done(error);
                results.body.data.should.be.a.Object();
                results.body.data.siteId.should.be.exactly('lax');
                done();
            })
    })
})
