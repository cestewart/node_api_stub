'use strict';

const express = require('express');
const app = module.exports = express();
const config = require('./config');

const responseModel = require('./models/response');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var userRouter = require('./routes/userRoutes')(responseModel);
app.use(config.routes.root + config.routes.users, userRouter);
var locationRouter = require('./routes/locationRoutes')(responseModel);
app.use(config.routes.root + config.routes.locations, locationRouter);

app.listen(config.server.port, function() {
   console.log('Running on PORT: ' + config.server.port)
});