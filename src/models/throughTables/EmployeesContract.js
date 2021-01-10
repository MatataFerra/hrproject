const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class EmployeeContract extends Model {}

EmployeeContract.init({

}, {
    sequelize,
    modelName: 'EmployeeContract',
    tableName: 'employeeContracts',
    timestamps: false
});

module.exports = {
    EmployeeContract
}