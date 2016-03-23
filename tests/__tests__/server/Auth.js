// Disable jest automock as these tests are part unit/part integration testing and we want sequelize

jest.autoMockOff();

const Auth = require('../../../server/controllers/Auth');

describe('Authentication Tests', () => {
  pit('Test JWT Tokens', () => {
    return Auth.issueJwtToken({ foo: 'bar' })
    .then(Auth.verifyAndDecodeJwtToken)
    .then((decoded) => {
      expect(decoded.foo).toBe('bar');
    })
    .catch((err) => {
      console.error(err);
      // Force failed test so we notice it is not working. Real question is what did it err.
      expect(1).toBe(2);
    });
  });
});

