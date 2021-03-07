const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../../database/conect');
const { nowTime } = require('../../services/time')


class Absence extends Model {}

Absence.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    start: {
        type: DataTypes.DATEONLY,
        defaultValue: nowTime.nowDate
        
    },

    end: {
        type: DataTypes.DATEONLY,
        defaultValue: nowTime.nowDate
    },

    sumdays:{
        type: DataTypes.INTEGER
    },

}, {
    sequelize,
    modelName: 'Absence',
    tableName: 'absence',
    timestamps: false
});

module.exports = {
    Absence
}