'use strict';

const db = require('./database').db;

db.sequelize.sync({ force: true })
.then(() => console.log('Successfully Created Database'))
.then(() => process.exit(0))
.catch((err) => {
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});
