
const db = require('./../server/db/database').db;
const Sequelize = db.Sequelize;

const newUserTemps = [{ user_name: 'vcipriani' },
{ user_name: 'user2' },
{ user_name: 'user3' },
{ user_name: 'user4' },
{ user_name: 'user5' }];

const newGroupTemps = [{ name: 'HackReactor' },
];

let newUsers;
let newEvents;
let newGroups;
/**
 * Resets the database w/ current schema and dummy data
 * @param (Object) A database object provided by db/database
 */
export const resetDbWithDummy = (sequelizeInstance) => {
  const db = sequelizeInstance;
  return db.sequelize.sync({ force: true })
  // Create new users
  .then(() => {
    return Sequelize.Promise.map(newUserTemps, user => db.User.create(user));
  })
  // Create Groups
  .then((users) => {
    newUsers = users;
    return Sequelize.Promise.map(newGroupTemps, group => db.Group.create(group));
  })
  // Add users to groups
  .then(groups => {
    newGroups = groups;
    
    // NOTE if you add additional friends here don't forget to update the promise handling
    return newUsers[1].addGroup(newGroups[0]);
  })
  // Create events
  .then(() => {
    const newEventTemps = [db.Event.makeEventTemplate(newUsers[0], 'Partay',
          Date.now(),
          Date.now(),
          '123 Main Street',
          'Apt 4',
          'San Francisco',
          'CA',
          '94107',
          [newUsers[1]]),
        db.Event.makeEventTemplate(newUsers[1], 'Partay #2',
          Date.now(),
          Date.now(),
          null,
          null,
          null,
          null,
          null),
        db.Event.makeEventTemplate(newUsers[0], 'Partay #3',
          Date.now(),
          Date.now(),
          '123 Main Street',
          'Apt 4',
          'San Francisco',
          'CA',
          '94107'),
        db.Event.makeEventTemplate(newUsers[0], 'Partay #4',
          Date.now(),
          Date.now(),
          '123 Main Street',
          'Apt 4',
          'San Francisco',
          'CA',
          '94107',
          null,
          [newGroups[0]])];
    return Sequelize.Promise.map(newEventTemps, event => db.Event.createEvent(event));
  })
  .then((events) => {
    newEvents = events;
    return newEvents;
  })
  .then(() => {
    // Signup 2nd user for the first event we created
    // return newUsers[1].addEvent(newEvents[0]);
  });
};
