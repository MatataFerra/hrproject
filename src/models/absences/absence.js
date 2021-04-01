const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../../database/conect');
const { nowTime } = require('../../services/time');
const { getDate }  = require('../../services/time')


class Absence extends Model {}

Absence.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    start: {
        type: DataTypes.DATEONLY,
        defaultValue: nowTime.nowDate,
        get() {
            const getData = this.getDataValue('start');
            return getDate(getData)
        }
        
    },

    end: {
        type: DataTypes.DATEONLY,
        defaultValue: nowTime.nowDate,
        get() {
            const getData = this.getDataValue('end');
            return getDate(getData)
        }
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