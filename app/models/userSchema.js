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

User.associate = (models) => {
    User.hasMany(models.Comment, {foreignKey: 'userId', as: 'userInfo'})
}

module.exports = User;