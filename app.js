'use strict';

const express = require('express');
const app = module.exports = express();
const config = require('./config');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes');
app.use(config.routes.root, routes);

app.listen(config.server.port, function() {
   console.log('Running on PORT: ' + config.server.port)
});