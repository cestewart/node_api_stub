'use strict';

const apiPrefix = '/api/';
const express = require('express');
const app = module.exports = express();
const config = require('./config');

const routes = require('./routes');

app.use(apiPrefix, routes);

app.listen(config.server.port, function() {
   console.log('Running on PORT: ' + config.server.port)
});