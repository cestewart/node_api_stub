'use strict';

var authenticationService = function (jwt, config) {
    function verifyToken(token) {
        try {
            return jwt.verify(token, config.jwt.password);
        } catch(error) {
            return null;
        }
    }

    function createToken(user) {
        if (user == null) return null;
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
        verifyToken: verifyToken,
        createToken: createToken
    }
};

module.exports = authenticationService;
