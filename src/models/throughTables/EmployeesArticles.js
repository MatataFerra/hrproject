const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class EmployeesArticles extends Model {}

EmployeesArticles.init({

}, {
    sequelize,
    modelName: 'EmployeesArticles',
    tableName: 'employeesArticles',
    timestamps: false
});

module.exports = {
    EmployeesArticles
}