const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
module.exports = function () {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}
const {
  User
} = require('../model/users');
const {
  Roles
} = require('../model/roles');
async function seed() {
  let roleSuperAdmin = await Roles.findById('5dcc2a308ce5b63ef00ced10');
  let rolereader = await Roles.findById('5dcc29bf8ce5b63ef00ced02');
  let rolewriter = await Roles.findById('5dcc29d98ce5b63ef00ced04');
  let roleupdater = await Roles.findById('5dcc29fb8ce5b63ef00ced07');
  let roledeleter = await Roles.findById('5dcc2a148ce5b63ef00ced0b');
  const users = [
    new User({
      name: 'testSuperAdmin',
      email: 'testsuperAdmin@gmail.com',
      password: '111111',
      isAdmin: true,
      roles: roleSuperAdmin,
    }),
    new User({
      name: 'testreader',
      email: 'testreader@gmail.com',
      password: '111111',
      isAdmin: false,
      roles: rolereader,
    }),
    new User({
      name: 'testwriter',
      email: 'testwriter@gmail.com',
      password: '111111',
      isAdmin: true,
      roles: rolewriter,
    }),
    new User({
      name: 'testupdate',
      email: 'testupdate@gmail.com',
      password: '111111',
      isAdmin: true,
      roles: roleupdater,
    }),
    new User({
      name: 'testdeleter',
      email: 'testdeleter@gmail.com',
      password: '111111',
      isAdmin: true,
      roles: roledeleter,
    })
  ]
  let don = 0;
  users.map(user => {
    user.save(function (err, result) {
      don++;
      if (don === users.length) {
        exit();
      }

    });
  })

}

function exit() {
  mongoose.disconnect();
}
// seed();