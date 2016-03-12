const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

require('./config/routes.js')(app, express);

const port = process.env.PORT || 3000;

console.log(`server running on port ${port} through ${process.env.PATH}`);
// start listening to requests on port 3000
app.listen(port);
