var should = require('should');
var sinon = require('sinon');

describe('Location Service Tests:', function() {
    describe('getAllLocations', function(){
        it('should return a list of locations', function() {
            var locationService = require('../../services/locationService');

            var results = locationService().getAllLocations();

            results.should.be.a.Array();
            results.length.should.be.exactly(2);
        })
    }),
    describe('getLocation', function() {
        it('should NOT return a location', function() {
            var locationService = require('../../services/locationService');

            var results = locationService().getLocation('foo');

            should(results).be.a.undefined();
        }),
        it('should return a location', function() {
            var locationService = require('../../services/locationService');

            var results = locationService().getLocation('dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f');

            results.should.be.a.Object();
            results.siteId.should.be.exactly('lax');
        })
    })
})

