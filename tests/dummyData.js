'use strict';

const newUserTemps = [{ userName: 'vcipriani', pw: 'food' },
{ userName: 'user2', pw: 'u' },
{ userName: 'user3', pw: 'u' },
{ userName: 'user4', pw: 'u' },
{ userName: 'user5', pw: 'u' }];

const newGroupTemps = [{ name: 'HackReactor' },
];

var newUsers;
var newEvents;
var newGroups;
/**
 * Resets the database w/ current schema and dummy data
 * @param (Object) A database object provided by db/database
 */
module.exports = (sequelizeInstance) => {
  const db = sequelizeInstance;
  return db.sequelize.sync({ force: true })
  // Create new users
  .then(() => {
    return db.Sequelize.Promise.map(
      newUserTemps, user => db.User.createUser(user.userName, user.pw)
    );
  })
  // Create Groups
  .then((users) => {
    newUsers = users;
    return db.Sequelize.Promise.map(newGroupTemps, group => db.Group.create(group));
  })
  // Add users to groups
  .then(groups => {
    newGroups = groups;

    // NOTE if you add additional friends here don't forget to update the promise handling
    return newUsers[1].addGroup(newGroups[0])
    .then(() => newUsers[4].addGroup(newGroups[0]))
    .then(() => newUsers[0].addGroup(newGroups[0]));
  })
  // Add friends
  .then(() => {
    return newUsers[0].addFriend(newUsers[1])
    .then(() => newUsers[0].addFriend(newUsers[1]))
    .then(() => newUsers[1].addFriend(newUsers[0]))
    .then(() => newUsers[1].addFriend(newUsers[2]))
    .then(() => newUsers[2].addFriend(newUsers[1]))
    .then(() => newUsers[1].addFriend(newUsers[3]))
    .then(() => newUsers[3].addFriend(newUsers[1]))
    .then(() => newUsers[0].addFriend(newUsers[3]))
    .then(() => newUsers[3].addFriend(newUsers[0]))
    .catch(console.error);
  })
  // Create events
  .then(() => {
    const newEventTemps = [db.Event.makeEventTemplate(newUsers[1], 'Partay',
          'jam',
          Date.now(),
          null,
          '123 Main Street, Apt 4, San Francisco, CA 94107',
          [newUsers[0], newUsers[3]],
          [newGroups[0]]),
        db.Event.makeEventTemplate(newUsers[1], 'Partay #2',
          'rager',
          Date.now(),
          null,
          'My house',
          null,
          null),
        db.Event.makeEventTemplate(newUsers[0], 'Party #3',
          'dino',
          Date.now(),
          null,
          'On the block'),
        db.Event.makeEventTemplate(newUsers[0], 'Group Party',
          'birthday',
          Date.now(),
          null,
          null,
          null,
          [newGroups[0]])];
    return db.Sequelize.Promise.map(newEventTemps, event => db.Event.createEvent(event));
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
