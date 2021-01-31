const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ContractHours extends Model {}

ContractHours.init({
    

}, {
    sequelize,
    modelName: 'ContractHours',
    tableName: 'contracthours',
    timestamps: false
});

module.exports = {
    ContractHours
}