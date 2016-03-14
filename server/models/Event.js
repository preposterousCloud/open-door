const Sequelize = require('sequelize');

module.exports = function Event(sequelizeInstance) {
  const seq = sequelizeInstance;
  const event = sequelizeInstance.define('Event',
    {
      name: Sequelize.STRING,
      startDateUtc: Sequelize.DATE,
      endDateUtc: Sequelize.DATE,
      addressStreet1: Sequelize.STRING,
      addressStreet2: Sequelize.STRING,
      city: Sequelize.STRING,
      stateAbbrev: Sequelize.STRING,
      postalCode: Sequelize.STRING,
    },
    {
      classMethods: {
        createEvent: function createEvent(eventObj) {
          return this.create(eventObj)
          .then((event) => {
            return event.setHostUser(eventObj.hostUser)
            .then(() => {return event;});
          })
          .then((event) => {
            // If we got any users add them to the event
            let a;
            let b;
            if (eventObj.users) {
              a = event.setUsers(eventObj.users);
            }
            // If we got any groups add them to the event
            if (eventObj.hosts) {
              b = event.setGroups(eventObj.hosts);
            }
            return Promise.all([a, b]).then(() => event);
          });
        },
        makeEventTemplate: function makeEvent(hostUser, name, startDateUtc, endDateUtc
        , addressStreet1, addressStreet2, city, stateAbbrev, postalCode, users, groups) {
          return {
            hostUser,
            name,
            startDateUtc,
            endDateUtc,
            addressStreet1,
            addressStreet2,
            city,
            stateAbbrev,
            postalCode,
            users,
            groups,
          };
        },
      },
    });
  return event;
};
