const { DataTypes } = require('sequelize');
const { sequelize } = require('../../server');

const Quote = sequelize.define('Quote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: 'Unknown'
    },
    language: {
        type: DataTypes.STRING,
        defaultValue: 'en'
    }
});

module.exports = Quote;