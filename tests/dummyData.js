'use strict';

const db = require('./../server/db/database').db;
const Sequelize = db.Sequelize;
const makeEvent = require('./../server/models/Event').makeEvent;

const newUserTemps = [{ user_name: 'vcipriani' }, { user_name: 'user2' }];
let newUsers;

const newEventTemps = [makeEvent('Partay',
        Date.now(),
        Date.now(),
        '123 Main Street',
        'Apt 4',
        'San Francisco',
        'CA',
        '94107')];
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
    return Sequelize.Promise.map(newEventTemps, event => db.Event.create(event));
  })
  .then((events) => {
    newEvents = events;
    // Assign newUsers[0] as host of all events created
    return events.map((event, index) => event.setHost_user(newUsers[0]));
  })
  .then(() => {
    // Signup 2nd user for the first event we created
    return newUsers[1].addEvent(newEvents[0]);
  });
};
