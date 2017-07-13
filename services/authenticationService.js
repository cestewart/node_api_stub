'use strict';

var authenticationService = function (jwt, config) {
    function verifyToken (request, response, next) {
        if (config.disableAuthorization) next();
        var token = request.headers['authorization'];
        if (token) {
            try {
                var decodedToken = jwt.verify(token, config.jwt.password);
                if (decodedToken.exp <= Date.now() / 1000) {
                    response.status(401);
                    response.end('Access token has expired');
                }
                next();
            } catch (err) {
                response.status(401);
                response.end('Access token is invalid');
            }
        } else {
            response.status(401);
            response.end('Access token is missing');
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
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * config.jwt.durationInHours)
        };
        return jwt.sign(token, config.jwt.password);
    }

    return {
        verifyToken: verifyToken,
        createToken: createToken
    }
};

module.exports = authenticationService;
