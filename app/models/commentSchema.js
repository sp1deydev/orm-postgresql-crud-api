const { DataTypes } = require('sequelize');
const sequelize = require('../../connection/config');


const Comment = sequelize.define('Comment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
          },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false 
});

Comment.associate = (models) => {
    Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'userInfo'})
}

module.exports = Comment;