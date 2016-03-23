
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config.js');

/**
 * Async saltsAndHashes string provided.  Returns a promise.
 */
const saltAndHash = (str) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, 10, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
};

/**
 * Compare hash to value provided
 */
const compareHashAndVal = (value, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

/**
 * Issues a JWT w/ the claims provided
 * @param (Object)
 */
const issueJwtToken = (claims) => {
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
const verifyAndDecodeJwtToken = (token) => {
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

const ensureUserHasValidJwt = (req, res, next, additionalCheck) => {
  if (!req.headers.access_token) {
    res.status(401).send('Must provide access_token header w/ JWT token');
  } else {
    verifyAndDecodeJwtToken(req.headers.access_token)
    .then((jwt) => {
      if (!additionalCheck(jwt)) {
        throw Error('User does not have permission to perform this action.');
      }
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      console.error(err);
      res.status(401).send('Invalid Credentials');
    });
  }
};

const ensureUserIsUser = (testPropertyOrFunc) => {
  return (req, res, next) => {
    ensureUserHasValidJwt(req, res, next, (jwt) => {
      if (typeof testPropertyOrFunc === 'string') {
        return jwt.userId === req.body[testPropertyOrFunc];
      }
      if (typeof testPropertyOrFunc === 'function') {
        return testPropertyOrFunc(req, jwt);
      }
      throw Error('Invalid parameter provided');
    });
  };
};

module.exports = {
  issueJwtToken,
  verifyAndDecodeJwtToken,
  ensureUserHasValidJwt,
  ensureUserIsUser,
  saltAndHash,
  compareHashAndVal,
};
