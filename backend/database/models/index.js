'use strict';
// initialize sequlize

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.js')[env];
const db = {};

//Connecting database
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Initialize the Models
db.lmsrole = require('./LmsRole.model.js')(sequelize, Sequelize);
db.lmsstudent = require('./LmsStudent.model.js')(sequelize, Sequelize);
db.lmsbooks = require('./LmsBooks.model.js')(sequelize, Sequelize);


module.exports = db;
