const sequelize = require('../../connection/config');
const { Sequelize } = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require('./userSchema.js');
const Comment = require('./commentSchema.js');

db.User = User;
db.Comment = Comment;


module.exports = db;