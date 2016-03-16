
// Disable jest automock as these tests are part unit/part integration testing and we want sequelize

jest.autoMockOff();

const _ = require('underscore');
const db = require('../../../server/db/database')._InjectDBConfig({ env: 'test', logging: false });
const resetDbWithDummy = require('./../../dummyData');

describe('Data Integration Tests', () => {
  beforeAll((done) => {
    resetDbWithDummy(db)
    .then(() => done());
  });

  pit('Make sure user can see all of the parties they should have access to', () => {
    return db.User.findOne({ where: { userName: 'user2' },
      include: [{ model: db.Group }] })
    .then(user => {
      return db.Event.getEventsForUser(user);
    })
    .then(data => {
      // The user should have exactly 3 parties, any more and access could be broken
      expect(data.length).toBe(3);

      const expectedParties = ['Partay', // Event the user is invited to]
      'Partay #2', // Event the user created
      'Group Party']; // Event one of the user's groups was invited to
      const containsAllParties = data.reduce((memo, party) => {
        return memo && expectedParties.indexOf(party.name) > -1;
      }, true);
      expect(containsAllParties).toBe(true);
    });
  });

  pit('Make sure Event has host', () => {
    return db.Event.findOne({})
    .then((data) => {
      expect(data.dataValues.hostUserId).toBe(1);
    });
  });
});
