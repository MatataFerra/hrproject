const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ArticlesStartEnd extends Model {}

ArticlesStartEnd.init({

}, {
    sequelize,
    modelName: 'ArticlesStartEnd',
    tableName: 'articlesstartend',
    timestamps: false
});

module.exports = {
    ArticlesStartEnd
}