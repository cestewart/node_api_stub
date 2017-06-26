'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

var authenticationService = (function () {
    function isTokenValid(request, response) {
        jwt.verify(request.headers['authorization'], config.jwt.password, function(error, decodedToken){
            if (error) {
                console.log('token is NOT valid');
            } else {
                console.log('token is valid');
                response.decodedToken = decodedToken;
            }
        });
    }

    function createToken(user) {
        var token = {
            iss: 'Fusion Alliance',
            aud: 'World',
            username: user.username,
            userId: user.id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * config.jwt.durationInHours),
        };
        return jwt.sign(token, config.jwt.password);
    }

    return {
        isTokenValid: isTokenValid,
        createToken: createToken
    }
})();

module.exports = authenticationService;
