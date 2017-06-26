'use strict';

var express = require('express');
var app = module.exports = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var config = require('./config');
var responseModel = require('./models/response');
var authenticationService = require('./services/authenticationService')(jwt,config);
var userService = require('./services/userService')(bcrypt, authenticationService);
var locationService = require('./services/locationService')();

var userRouter = require('./routes/userRoutes')(responseModel, userService);
app.use(config.routes.root + config.routes.users, userRouter);
var locationRouter = require('./routes/locationRoutes')(responseModel, locationService);
app.use(config.routes.root + config.routes.locations, locationRouter);

app.listen(config.server.port, function() {
   console.log('Running on PORT: ' + config.server.port)
});