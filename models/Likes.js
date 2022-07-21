const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const Likes = sequelize.define('Likes', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }




}, {
    // Other model options go here
});

module.exports = Likes