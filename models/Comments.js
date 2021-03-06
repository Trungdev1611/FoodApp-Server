const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const Comments = sequelize.define('comments', {
    // Model attributes are defined here
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    idfooditem: {
        type: DataTypes.STRING,
        allowNull: false
    },




}, {
    // Other model options go here
});

module.exports = Comments