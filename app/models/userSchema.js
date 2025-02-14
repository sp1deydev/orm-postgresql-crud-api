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
}, {
    timestamps: true 
});


module.exports = User;