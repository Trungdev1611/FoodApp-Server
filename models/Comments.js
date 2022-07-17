const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const Comments = sequelize.define('comments', {
    // Model attributes are defined here
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    likes: {
        type: DataTypes.STRING,
        allowNull: true
    }



}, {
    // Other model options go here
});

module.exports = Comments