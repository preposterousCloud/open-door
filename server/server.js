var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);
