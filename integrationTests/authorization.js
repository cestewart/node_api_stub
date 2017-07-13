var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var agent = request.agent(app);
var config = require('../config');

describe('Authorization Tests', function(){
    it('Should return 401 when token is missing', function(done){
        agent.get(config.routes.root + config.routes.locations)
            .expect(401)
            .end(function(error) {
                if (error) return done(error);
                done();
            });
        });
    it('Should return 401 when token is invalid', function(done){
        agent.get(config.routes.root + config.routes.locations)
            .set({authorization:'bad_token'})
            .expect(401)
            .end(function(error) {
                if (error) return done(error);
                done();
            });
        });
    });
