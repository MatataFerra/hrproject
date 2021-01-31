const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/conect');

class Hours extends Model {}

Hours.init({

    hours: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['HS', 'HC']]
        }
    }

}, {
    sequelize,
    modelName: 'Hours',
    tableName: 'hours',
    timestamps: false
});

module.exports = {
    Hours
}