const db = require('../db/database').db;

const _mapGroup = (group) => {
  return {
    id: group.id,
    name: group.name,
  };
};

module.exports.createGroup = function createGroup(req, res) {
  if (!req.body.groupName) {
    res.status(404).send('Make sure to include a user name and appropriate properties');
  } else {
    db.Group.create({ name: req.body.groupName })
    .then((group) => res.json(_mapGroup(group)))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unknown server problem');
    });
  }
};
