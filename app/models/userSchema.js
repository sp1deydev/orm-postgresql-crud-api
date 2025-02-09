const { DataTypes } = require('sequelize');
const sequelize = require('../../connection/config');


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Make sure it's explicitly set
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

sequelize.sync({ force: false }) // force: true will drop & recreate tables
    .then(() => {
        // console.log('Tables synced!')
    })
    .catch(err => console.error('Error syncing tables:', err));


module.exports = User;