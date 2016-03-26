const db = require('../db/database').db;
const Auth = require('./Auth');

module.exports.loginUser = (req, res) => {
  db.User.findOne({ where: { userName: req.body.userName },
    attributes: {include: ['pw'] } })
  .then((user) => {
    return user.checkPasswordAndIssueJwt(req.body.pw)
    .then((jwt) => {
      // Don't want to send pw back to client.  Delete wasn't actually removing it
      user.pw = '';
      res.json({ jwt, user });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(401).send('Invalid Credentials');
  });
};
