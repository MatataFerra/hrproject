const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ArticlesDays extends Model {}

ArticlesDays.init({

}, {
    sequelize,
    modelName: 'ArticlesDays',
    tableName: 'articlesDays',
    timestamps: false
});

module.exports = {
    ArticlesDays
}