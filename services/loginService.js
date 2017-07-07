'use strict';

var loginService = function (bcrypt, userService, authenticationService) {
    function login(username, password) {
        var user = userService.getByUsername(username);
        if (user === undefined) return null;
        if (!bcrypt.compareSync(password, user.password)) return null;
        user.token = authenticationService.createToken(user);
        return user;
    }

    return {
        login: login
    }
};

module.exports = loginService;
