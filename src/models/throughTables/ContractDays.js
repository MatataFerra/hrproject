const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/conect');

class ContractDays extends Model {}

ContractDays.init({

}, {
    sequelize,
    modelName: 'ContractDays',
    tableName: 'contractDays',
    timestamps: false
});

module.exports = {
    ContractDays
}