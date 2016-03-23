const db = require('../db/database').db;
const Auth = require('./Auth');

module.exports.loginUser = (req, res) => {
  db.User.findOne({ where: { userName: req.body.userName } })
  .then((user) => user.checkPasswordAndIssueJwt(req.body.pw))
  .then((jwt) => {
    res.json({ jwt });
  })
  .catch(err => {
    console.error(err);
    res.status(401).send('Invalid Credentials');
  });
};
