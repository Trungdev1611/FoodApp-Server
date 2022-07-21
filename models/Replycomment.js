const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const Replycomment = sequelize.define('Replycomment', {
    // Model attributes are defined here
    contentReply: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usernameReply: {
        type: DataTypes.STRING,
        allowNull: false
    },






}, {
    // Other model options go here
});

module.exports = Replycomment