var should = require('should');
var sinon = require('sinon');

describe('User Service Tests:', function() {
    describe('getByUsername', function(){
        it('should return a user', function() {
            var userService = require('../../services/userService')(require('lodash'));

            var results = userService.getByUsername('bobsmith');

            results.id.should.be.exactly('7cafedfb-616c-4093-bec6-b167bcd18ca8');
        });
        it('should NOT return a user', function() {
            var userService = require('../../services/userService')(require('lodash'));

            var results = userService.getByUsername('bobsmithy');

            should(results).be.a.undefined();
        });
    });
    describe('getById', function(){
        it('should return a user', function() {
            var userService = require('../../services/userService')(require('lodash'));

            var results = userService.getById('7cafedfb-616c-4093-bec6-b167bcd18ca8');

            results.username.should.be.exactly('bobsmith');
        });
        it('should NOT return a user', function() {
            var userService = require('../../services/userService')(require('lodash'));

            var results = userService.getById('missing id');

            should(results).be.a.undefined();
        });
    });
    describe('getAll', function() {
        it('should get all users', function () {
            var userService = require('../../services/userService')(require('lodash'));

            should(userService.getAll().length).be.exactly(4);
        });
    });
    describe('addUser', function() {
        it('should add a user', function () {
            var userService = require('../../services/userService')(require('lodash'));

            var user = {
                id: '1577f584-b21d-4d21-8ee7-7d2698283176',
                firstName: 'Tester',
                lastName: 'Smithy',
                username: 'tsmith',
                password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
            };

            var count = userService.getAll().length;

            userService.addUser(user);

            should(userService.getAll().length).be.exactly(count + 1);
        });
    });
    describe('deleteUser', function() {
        it('should delete a user', function () {
            var userService = require('../../services/userService')(require('lodash'));

            var user = {
                id: 'df9980bc-6b79-4fe3-8bbc-5a81c7b88e0b'
            };

            var count = userService.getAll().length;

            userService.deleteUser(user);

            should(userService.getAll().length).be.exactly(count - 1);
        });
    });
    describe('updateUser', function() {
        it('should update a user', function () {
            var userService = require('../../services/userService')(require('lodash'));

            var user =         {
                id: '95da18d2-1968-476e-bab8-799598c9962e',
                firstName: 'Melissa',
                lastName: 'Smith',
                username: 'melissajones',
                password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
            };

            userService.updateUser(user);

            should(userService.getById('95da18d2-1968-476e-bab8-799598c9962e').lastName).be.exactly('Smith');
        });
    });
});

