const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class EmployeeSchool extends Model {}

EmployeeSchool.init({

}, {
    sequelize,
    modelName: 'EmployeeSchool',
    tableName: 'employeeSchools',
    timestamps: false
});

module.exports = {
    EmployeeSchool
}