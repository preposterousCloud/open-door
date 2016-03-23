
const jwt = require('jsonwebtoken');

const config = require('../config.js');

/**
 * Issues a JWT w/ the claims provided
 * @param (Object)
 */
module.exports.issueJwtToken = (claims) => {
  return new Promise((resolve, reject) => {
    jwt.sign(claims, config.jwtSecret, { algorithm: 'HS256' }, (token) => {
      resolve(token);
    });
  });
};

/**
 * Issues a JWT w/ the claims provided
 * @param (Object)
 */
module.exports.verifyAndDecodeJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] }, (err, decodedToken) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decodedToken);
    });
  });
};
