'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const defaultErrorHandler = require('./controllers/Errors').defaultErrorHandler;
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../web')));

require('./controllers/routes.js')(app, express);
app.use(defaultErrorHandler);

const port = process.env.PORT || 3000;

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);
