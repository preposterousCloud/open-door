'use strict';

const Sequelize = require('sequelize');

module.exports = function Group(sequelizeInstance) {
  return sequelizeInstance.define('Group', {
    name: Sequelize.STRING,
    picture: {
      type: Sequelize.String,
      defaultValue: 'http://img3.wikia.nocookie.net/__cb20140120043524/scratchpad/images/9/92/Power_Rangers_Megaforce_(Nick).jpg',
    },
  });
};
