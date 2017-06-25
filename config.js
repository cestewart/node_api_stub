'use strict';

module.exports = {
    routes: {
        root: '/api',
        users: '/users'
    },
    server: {
        port: 8000
    },
    bcrypt: {
        saltRounds: 10
    },
    jwt: {
        password: '8ynK#Hsz}_%uZL~5B@fNSC'
    }
};
