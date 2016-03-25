
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

  // We set this the first time we find it so we can use it in later tests
  var user2;

  pit('Make sure user can see all of the parties they should have access to', () => {
    return db.User.findOne({ where: { userName: 'user2' },
      include: [{ model: db.Group }] })
    .then(user => {
      user2 = user;
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

  pit('Should properly validate passwords', () => {
    return db.User.findOne({ where: { userName: 'vcipriani' } })
    .then(user => {
      user.checkPasswordAndIssueJwt('wrongpw')
      // following line shouldn't fire because checkpassword should throw
      .then((result) => expect(true).toBe(false))
      .catch((err) => {
        // Nothing to test.  The fact that checkPasswordAndIssueJwt error'd is good
      })
      .then(() => {
        user.checkPasswordAndIssueJwt('food')
        .then(jwt => {
          // The JWT token should always be 60 char
          expect(jwt.length).toBe(60);
        });
      });
    });
  });

  pit('Make sure Event has host', () => {
    return db.Event.findOne({})
    .then((data) => {
      expect(data.dataValues.hostUserId);
    });
  });

  pit('Make sure Event can be closed and user cannot see it', () => {
    return db.Event.findOne({ where: { name: 'Partay #2' } })
    .then((event) => {
      expect(event.endDateUtc).toEqual(null);
      return event.closeEvent()
      .then((updatedEvent) => {
        expect(updatedEvent.endDateUtc).toBeTruthy();
        return db.Event.getEventsForUser(user2);
      })
      .then((events) => {
        // Length of filtered array should be 0 - ie. false;
        var containsClosedEvent = events.filter(e => e.name === 'Partay #2').length;
        console.log(containsClosedEvent);
        expect(containsClosedEvent).toBeFalsy();
      });
    });
  });
});
