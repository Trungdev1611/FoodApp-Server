const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../ConnectDB')

const InfoCart = sequelize.define('InfoCart', {
    // Model attributes are defined here
    idproduct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dsc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }


}, {
    // Other model options go here
});

module.exports = InfoCart