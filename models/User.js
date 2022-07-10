const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    }

});

module.exports = User