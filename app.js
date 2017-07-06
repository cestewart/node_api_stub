'use strict';

var express = require('express');
var app = module.exports = express();
var config = require('./config');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var userRouter = require('./routes/userRoutes')();
app.use(config.routes.root + config.routes.users, userRouter);
var locationRouter = require('./routes/locationRoutes')();
app.use(config.routes.root + config.routes.locations, locationRouter);

app.listen(config.server.port, function() {
   console.log('Running on PORT: ' + config.server.port)
});