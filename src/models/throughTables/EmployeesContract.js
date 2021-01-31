const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class EmployeeContract extends Model {}

EmployeeContract.init({
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    
    
}, {
    sequelize,
    modelName: 'EmployeeContract',
    tableName: 'employeeContracts',
    timestamps: false
});

module.exports = {
    EmployeeContract
}