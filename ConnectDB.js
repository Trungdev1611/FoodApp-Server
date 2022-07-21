const Sequelize = require('sequelize')
const sequelize = new Sequelize('food_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    "dialectOptions": {
        "useUTC": true
    },
    "timezone": "+07:00"
});

let checkconnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
checkconnect()

//check connect DB
module.exports = sequelize
