
// Disable jest automock as these tests are part unit/part integration testing and we want sequelize

jest.autoMockOff();

const db = require('./../../../server/db/database')._InjectDBConfig({ env: 'test', logging: false });
const makeEvent = require('./../../../server/models/Event');
const resetDbWithDummy = require('./../../dummyData').resetDbWithDummy;

describe('Data Integration Tests', () => {
  beforeAll((done) => {
    resetDbWithDummy(db)
    .then(() => done());
  });

  let createdUser;
  pit('User2 can view Partay', () => {
    return db.User.findOne({
      where: { user_name: 'user2' },
      include: [{ model: db.Event }] })
    .then((data) => {
      expect(data.Events[0].name).toBe('Partay');
    });
  });
});