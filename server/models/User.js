/**
 * Here we map out any User methods we need and return a new Pseudoclassical class
 * which extend the DB user.
 */

const UserDbModel = require('../db/database').User;

export const User = Object.assign({}, UserDbModel);

