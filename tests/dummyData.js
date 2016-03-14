
const db = require('./../server/db/database').db;
const Sequelize = db.Sequelize;

const newUserTemps = [{ user_name: 'vcipriani' }, { user_name: 'user2' }];
let newUsers;
let newEvents;

/**
 * Resets the database w/ current schema and dummy data
 * @param (Object) A database object provided by db/database
 */
export const resetDbWithDummy = (sequelizeInstance) => {
  const db = sequelizeInstance;
  return db.sequelize.sync({ force: true })
  .then(() => {
    return Sequelize.Promise.map(newUserTemps, user => db.User.create(user));
  })
  .then((users) => {
    newUsers = users;

    const newEventTemps = [db.Event.makeEvent(newUsers[0], 'Partay',
        Date.now(),
        Date.now(),
        '123 Main Street',
        'Apt 4',
        'San Francisco',
        'CA',
        '94107')];
    return Sequelize.Promise.map(newEventTemps, event => db.Event.createEvent(event));
  })
  .then((events) => {
    newEvents = events;
    return newEvents;
  })
  .then(() => {
    // Signup 2nd user for the first event we created
    return newUsers[1].addEvent(newEvents[0]);
  });
};
