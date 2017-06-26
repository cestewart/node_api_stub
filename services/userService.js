'use strict';

var userService = function (bcrypt, authenticationService) {
    var users = [
        {
            id: 'd20ed1a1-4650-4d8f-9df7-5faa91363341',
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
        },
        {
            id: '7cafedfb-616c-4093-bec6-b167bcd18ca8',
            firstName: 'Bob',
            lastName: 'Smith',
            username: 'bobsmith',
            password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
        },
        {
            id: '95da18d2-1968-476e-bab8-799598c9962e',
            firstName: 'Melissa',
            lastName: 'Jones',
            username: 'melissajones',
            password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
        },
        {
            id: 'df9980bc-6b79-4fe3-8bbc-5a81c7b88e0b',
            firstName: 'George',
            lastName: 'Jones',
            username: 'georgejones',
            password: '$2a$10$u4ONtuiO9bKjdMODbeXtzO1OauSlYm.bxb1VihX9uhHqbT0hOmFBG'
        }
    ];

    function getUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                return users[i];
            }
        }
    }

    function login(request) {
        var user = getUserByUsername(request.body.username);
        if (user === undefined) return null;
        if (!bcrypt.compareSync(request.body.password, user.password)) return null;
        user.token = authenticationService.createToken(user);
        return user;
    }

    return {
        login: login,
    }
};

module.exports = userService;
