//Articulos que determina la ley
//Articles determinated by law

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class Article extends Model {}

Article.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    number: {
        type: DataTypes.INTEGER
    },

    article: {
        type: DataTypes.STRING
    }, 

    description: {
        type: DataTypes.STRING
    },

    maxquantity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false
});

module.exports = {
    Article
}