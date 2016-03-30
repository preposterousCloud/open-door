const db = require('../db/database').db;
const Auth = require('./Auth');
const HttpError = require('./Errors').HttpError;

module.exports.loginUser = (req, res, next) => {
  db.User.findOne({ where: { userName: req.body.userName },
    attributes: { include: ['pw'] } })
  .then((user) => {
    if (user) {
      return user.checkPasswordAndIssueJwt(req.body.pw)
      .then((jwt) => {
        if (jwt) {
          return res.json({ jwt, user });
        }
        next(new HttpError(401, 'Invalid Credentials'));
      });
    } else {
      next(new HttpError(401, 'Invalid Credentials'));  
    }
  })
  .catch(err => {
    next(err);
  });
};
