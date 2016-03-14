const Sequelize = require('sequelize');

module.exports = function Event(sequelizeInstance) {
  const event = sequelizeInstance.define('Event', {
    name: Sequelize.STRING,
    startDateUtc: Sequelize.DATE,
    endDateUtc: Sequelize.DATE,
    addressStreet1: Sequelize.STRING,
    addressStreet2: Sequelize.STRING,
    city: Sequelize.STRING,
    stateAbbrev: Sequelize.STRING,
    postalCode: Sequelize.STRING,
  }, {
    classMethods: {
      createEvent: function createEvent(eventObj) {
        return this.create(eventObj)
        .then((event) => {
          return event.setHost_user(eventObj.hostUser)
          .then(() => {return event;});
        });
      },
      makeEvent: function makeEvent(hostUser, name, startDateUtc, endDateUtc, addressStreet1
        , addressStreet2, city, stateAbbrev, postalCode) {
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
        };
      },
    },
  });

  return event;
};
