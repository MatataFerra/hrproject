const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Days extends Model {}

const days = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
]

Days.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    days: {
        type: DataTypes.STRING,
        validate: {
            isIn: [
                [days]
            ]
        },

        defaultValue: days[0]
    },

    open: {
        type: DataTypes.TIME
    },

    close: {
        type: DataTypes.TIME
    }
}, {
    sequelize,
    modelName: 'Days',
    tableName: 'days',
    timestamps: false
});

module.exports = {
    Days
}