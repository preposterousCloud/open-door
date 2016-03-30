
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HttpError = require('./Errors').HttpError;
const config = require('../config.js');
const secret = config.jwtSecret;

if (!secret) {
  throw Error('Make sure you config file has a jwtSecret property.  This is required.');
}

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
  console.log('>>>>>>', claims)
  return new Promise((resolve, reject) => {
    jwt.sign(claims, secret, { algorithm: 'HS256' }, (token) => {
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
    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decodedToken) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decodedToken);
    });
  });
};

/**
 * WARNING: this should not be used as an actual express route.  The method signature is invalid.
 * We use it internally it other express routes as a helper.
 */
const _ensureUserHasValidJwt = (req, res, next, additionalCheck) => {
  if (!req.headers.access_token) {
    next(new HttpError(401, 'Must provide access_token header w/ JWT token'));
  } else {
    verifyAndDecodeJwtToken(req.headers.access_token)
    .then((jwt) => {
      if (additionalCheck && !additionalCheck(jwt)) {
        throw Error('User does not have permission to perform this action.');
      }
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      next(err);
    });
  }
};

const ensureUserHasValidJwt = (req, res, next) => {
  _ensureUserHasValidJwt(req, res, next);
};

const ensureUserIsUser = (testPropertyOrFunc) => {
  return (req, res, next) => {
    _ensureUserHasValidJwt(req, res, next, (jwt) => {
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
  _ensureUserHasValidJwt,
};
