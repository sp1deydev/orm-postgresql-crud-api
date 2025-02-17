const sequelize = require('../../connection/config');
const { Sequelize } = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require('./userSchema.js');
const Comment = require('./commentSchema.js');

db.User = User;
db.Comment = Comment;

//SETUP ASSOCIATIONS
Object.keys(db).forEach((model) => {
    if(db[model].associate) {
        db[model].associate(db);
    }
})


module.exports = db;