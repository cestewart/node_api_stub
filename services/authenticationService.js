'use strict';

const bcrypt = require('bcrypt');
const config = require('../config');

var authenticationService = (function () {

    function isTokenValid(token) {
        return true;
    }

    function createToken(user) {
        return "token token token!";
    }

    function encrypt(word) {
        return bcrypt.hashSync(word, config.bcrypt.saltRounds);
    }

    return {
        isTokenValid: isTokenValid,
        createToken: createToken,
        encrypt: encrypt
    }
})();

module.exports = authenticationService;
