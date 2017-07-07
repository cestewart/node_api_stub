var should = require('should');
var sinon = require('sinon');

describe('Location Controller Tests:', function(){
    describe('getAllLocations', function(){
        it('should return all locations', function() {
            var locationService = require('../../services/locationService')(require('lodash'));
            var locationController = require('../../controllers/locationController')(locationService, require('../../models/response'));
            var request = { };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            locationController.getAllLocations(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            response.send.args[0][0].data.length.should.equal(2);
        });
    });
    describe('getLocation', function(){
        it('should return a location', function() {
            var locationService = require('../../services/locationService')(require('lodash'));
            var locationController = require('../../controllers/locationController')(locationService, require('../../models/response'));
            var request = { params: { id:'dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f' } };
            var response = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            locationController.getLocation(request, response);

            response.status.calledWith(200).should.equal(true, 'Bad Status ' + response.status.args[0][0]);
            response.send.args[0][0].success.should.equal(true);
            response.send.args[0][0].data.id.should.equal('dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f');
        });
    });
});



