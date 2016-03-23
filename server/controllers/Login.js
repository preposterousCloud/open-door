const db = require('../db/database').db;

module.exports.loginUser = (req, res) => {
  db.User.checkPassword(req.body.userName, req.body.pw)
  .then((isCorrectPw) => {
    if (isCorrectPw) {
      res.json({ jwt: 'its a JWT!!' });
      return;
    }
    res.status(401).send('Invalid Credentials');
    return;
  });
};
