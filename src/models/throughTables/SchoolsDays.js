const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class SchoolsDays extends Model {}

SchoolsDays.init({

}, {
    sequelize,
    modelName: 'SchoolsDays',
    tableName: 'schoolsDays',
    timestamps: false
});

module.exports = {
    SchoolsDays
}