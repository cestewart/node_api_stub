'use strict';

var locationService = function (_) {
    var locations = [
        {
            id: 'c0b694ec-3352-43e3-9f22-77c87fe83d48',
            siteId: 'ind',
            name: 'Indianapolis International Airport',
            city: 'Indianapolis',
            stateCode: 'IN'
        },
        {
            id: 'dc95a8f9-713f-4aed-bf5e-4e5567c4dd9f',
            siteId: 'lax',
            name: 'Los Angeles International Airport',
            city: 'Los Angeles',
            stateCode: 'CA'
        }
    ];

    function getAllLocations() {
        return locations;
    }

    function getLocation(id) {
        return _.find(locations, {id:id})
    }

    return {
        getAllLocations: getAllLocations,
        getLocation: getLocation
    }
};

module.exports = locationService;
