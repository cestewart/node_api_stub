var should = require('should');
var sinon = require('sinon');

describe('Location Service Tests:', function() {
    describe('getAllLocations', function(){
        it('should return a list of locations', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var results = locationService.getAllLocations();

            results.should.be.a.Array();
            results.length.should.be.exactly(2);
        });
    });
    describe('getLocation', function() {
        it('should NOT return a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var results = locationService.getLocation('foo');

            should(results).be.a.undefined();
        });
        it('should return a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var results = locationService.getLocation('dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f');

            results.should.be.a.Object();
            results.siteId.should.be.exactly('lax');
        });
    });
    describe('addLocation', function() {
        it('should add a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var location = {
                id: 'df0fb226-6fe5-4db7-aa7a-ebe486628297',
                siteId: 'ord',
                name: 'OHare International Airport',
                city: 'Chicago',
                stateCode: 'IL'
            };

            var count = locationService.getAllLocations().length;

            locationService.addLocation(location);

            should(locationService.getAllLocations().length).be.exactly(count + 1);
        });
    });
    describe('deleteLocation', function() {
        it('should delete a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var location = {
                id: 'dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f'
            };

            var count = locationService.getAllLocations().length;

            locationService.deleteLocation(location);

            should(locationService.getAllLocations().length).be.exactly(count - 1);
        });
    });
    describe('updateLocation', function() {
        it('should delete a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));

            var location =         {
                id: 'dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f',
                siteId: 'lai',
                name: 'Los Angeles International Airport',
                city: 'Los Angeles',
                stateCode: 'CA'
            }

            locationService.updateLocation(location);

            should(locationService.getLocation('dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f').siteId).be.exactly('lai');
        });
    });
});
