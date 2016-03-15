'use strict';

// Args start at index=2
const args = process.argv.slice(2);

const db = require('./database').db;

db.sequelize.sync({ force: true })
.then(() => console.log('Successfully Created Database'))
.then(() => {
  // If we were passed setdummydata, we should set it up
  if (args[0] && args[0].toLowerCase() === 'setdummydata') {
    console.log('Setup dummy data');
    return require('../../tests/dummyData')(db);
  }
})
.then(() => process.exit(0))
.catch((err) => {
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});


