
// Disable jest automock as these tests are part unit/part integration testing and we want sequelize

jest.autoMockOff();

const db = require('../../../server/db/database')._InjectDBConfig({ env: 'test', logging: false });
const resetDbWithDummy = require('./../../dummyData').resetDbWithDummy;

describe('Data Integration Tests', () => {
  beforeAll((done) => {
    resetDbWithDummy(db)
    .then(() => done());
  });

  pit('Make sure user can see all of the parties they should have access to', () => {
    return db.User.findOne({ where: { user_name: 'user2' },
      include: [{ model: db.Group }] })
    .then(user => {
      return db.Event.getEventsForUser(user);
    })
    .then(data => {
      expect(data[0].name).toBe('Partay'); // Event the user is invited to
      expect(data[1].name).toBe('Partay #2'); // Event the user created
      expect(data[2].name).toBe('Group Party'); // Event one of the user's groups was invited to
      expect(data.length).toBe(3); // The user should have exactly 3 parties, any more and access could be broken
    });
  });

  pit('Make sure Event has host', () => {
    return db.Event.findOne({})
    .then((data) => {
      expect(data.dataValues.hostUserId).toBe(1);
    });
  });
  
  pit('Test Playground', () => {

  }); 
});
